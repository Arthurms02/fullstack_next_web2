import { RegisterAuthSchemaType } from "../_schemas/registerAuthSchema";
import bcrypt from "bcryptjs";
import User from "@/models/Usuario";
import Profile from "@/models/Profile";
import dbConnect from "@/lib/db";
import Barbeiro from "@/models/Barbeiro";
import { RegisterBarbeiroSchemaType } from "../_schemas/registerBarbeiroSchema";

export async function registerUserService(payload: RegisterAuthSchemaType) {
  await dbConnect();

  const senhaOriginal = payload.password;

  const hashedPassword = await bcrypt.hash(senhaOriginal, 10);
  try {
    const newUser = await User.create({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: 'client',
    });

    try {
      await Profile.create({ user: newUser._id });
      return { success: true, message: 'Usuário registrado com sucesso' };
    } catch (profileErr) {
      // If profile creation fails, remove the created user to avoid inconsistent state
      await User.deleteOne({ _id: newUser._id });
      return { success: false, message: 'Erro ao criar perfil do usuário' };
    }
  } catch (err: any) {
    if (err?.code === 11000) {
      return { success: false, message: 'Email já registrado' };
    }
    return { success: false, message: 'Erro ao registrar usuário' };
  }
}

export async function registerBarberService(payload: RegisterBarbeiroSchemaType) {
  await dbConnect();

  const senhaOriginal = payload.password;

  const hashedPassword = await bcrypt.hash(senhaOriginal, 10);

  try {
    const novoBarbeiro = await Barbeiro.create({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      cpf: payload.cpf,
      establishmentName: payload.establishmentName,
      role: 'barber'
    });

    try {
      await Profile.create({ user: novoBarbeiro._id });
      return { success: true, message: 'Barbeiro registrado com sucesso' };
    } catch (profileErr) {
      await Barbeiro.deleteOne({ _id: novoBarbeiro._id });
      return { success: false, message: 'Erro ao criar perfil do barbeiro' };
    }
  } catch (err: any) {
    if (err?.code === 11000) {
      return { success: false, message: 'Email já registrado' };
    }
    return { success: false, message: 'Erro ao registrar barbeiro' };
  }
} 

