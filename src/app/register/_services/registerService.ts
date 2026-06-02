import { RegisterAuthSchemaType } from "../_schemas/registerAuthSchema";
import bcrypt from "bcryptjs";
import User from "@/models/Usuario";
import dbConnect from "@/lib/db";
import { toast } from "sonner";

export async function registerUserService(payload: RegisterAuthSchemaType) {
  await dbConnect();

  const emailExists = await User.findOne({ email: payload.email });

  if (emailExists) {
    toast.error('Email já registrado',{ position: "top-center" });
    return;
  }

  const senhaOriginal = payload.password;

  const hashedPassword = await bcrypt.hash(senhaOriginal, 10);
  try {
    await User.create({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role,
    });
  } catch (err: any) {
    if (err?.code === 11000) {
      toast.error('Email já registrado',{ position: "top-center" });
    }
    throw err;
  }
}
