import { RegisterAuthSchemaType } from "../_schemas/registerAuthSchema";
import bcrypt from "bcryptjs";
import User from "@/models/Usuario";
import Profile from "@/models/Profile";
import dbConnect from "@/lib/db";
import { toast } from "sonner";
import Barbeiro from "@/models/Barbeiro";
import { RegisterBarbeiroSchemaType } from "../_schemas/registerBarbeiroSchema";

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

export async function registerBarberService(payload: RegisterBarbeiroSchemaType) {
  await dbConnect();

  const emailExists = await Barbeiro.findOne({ email: payload.email });

  if (emailExists) {
    toast.error('Email já registrado',{ position: "top-center" });
    return;
  }

  const senhaOriginal = payload.password;

  const hashedPassword = await bcrypt.hash(senhaOriginal, 10);
  try {
    const novoBarbeiro = await Barbeiro.create({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      cpf: payload.cpf,
      estabelecimento: payload.establishmentName,
      role: 'barber'
    });

    try {
      await Profile.create({ user: novoBarbeiro._id });
    } catch (profileErr) {
      // If profile creation fails, remove the created user to avoid inconsistent state
      await Barbeiro.deleteOne({ _id: novoBarbeiro._id });
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

