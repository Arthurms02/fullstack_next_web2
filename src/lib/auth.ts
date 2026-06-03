import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/Usuario";
import Barbeiro from "@/models/Barbeiro"; // 1. Importe o model de Barbeiro
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        // 2. Tenta buscar primeiro em Usuario
        let user = await User.findOne({ email: credentials?.email }).select("+password");

        // 3. Se não encontrar em Usuario, busca em Barbeiro
        if (!user) {
          user = await Barbeiro.findOne({ email: credentials?.email }).select("+password");
        }

        // Se não encontrar em nenhum dos dois
        if (!user) {
          throw new Error("Usuário ou Barbeiro não encontrado");
        }

        const isValid = await bcrypt.compare(credentials!.password, user.password);

        if (!isValid) {
          throw new Error("Senha incorreta");
        }

        // Retorna os dados necessários (o mongoose document do barbeiro precisa ter o campo role também)
        return { 
          id: user._id.toString(),
          name: user.name, 
          email: user.email,
          role: user.role // Garanta que ambos os models salvam a role ('cliente' / 'barbeiro')
         };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // 4. Importante: repassar a role do user para o token JWT no primeiro login
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      // 5. Injetar o id e a role vindos do token na sessão do NextAuth
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role; 
      }
      return session;
    }
  }
};