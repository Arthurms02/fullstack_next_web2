import { RegisterAuthSchemaType } from "../_schemas/registerAuthSchema";
import bcrypt from "bcryptjs";
import User from "@/models/Usuario";
import dbConnect from "@/lib/db";

export async function registerUserService(payload: RegisterAuthSchemaType) {
  await dbConnect();

  const emailExists = await User.findOne({ email: payload.email });

  if (emailExists) {
    return { success: false, message: "Email já registrado" };
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  try {
    await User.create({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role,
    });

    return { success: true, message: "Cadastro realizado com sucesso" };
  } catch (error: unknown) {
    const mongoError = error as { code?: number };

    if (mongoError.code === 11000) {
      return { success: false, message: "Email já registrado" };
    }

    throw error;
  }
}
