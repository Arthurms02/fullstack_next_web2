import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "client" | "barber";
    } & DefaultSession["user"];
  }

  interface User {
    role: "client" | "barber";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "client" | "barber";
  }
}
