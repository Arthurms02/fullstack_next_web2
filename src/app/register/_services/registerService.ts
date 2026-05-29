import { RegisterAuthSchemaType } from "../_schemas/registerAuthSchema";
import bcrypt from "bcryptjs";
import User from "@/models/Usuario";
import Profile from "@/models/Profile";
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
    const newUser = await User.create({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    });

    try {
      await Profile.create({ user: newUser._id });
    } catch (profileErr) {
      // If profile creation fails, remove the created user to avoid inconsistent state
      await User.deleteOne({ _id: newUser._id });
      toast.error('Erro ao criar perfil. Tente novamente.',{ position: "top-center" });
      throw profileErr;
    }
  } catch (err: any) {
    if (err?.code === 11000) {
      toast.error('Email já registrado',{ position: "top-center" });
    }
    throw err;
  }
}
