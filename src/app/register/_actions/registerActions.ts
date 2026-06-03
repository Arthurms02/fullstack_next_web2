'use server';


import Barbeiro from "@/models/Barbeiro";
import User from "@/models/Usuario";
import { RegisterAuthSchemaType } from "../_schemas/registerAuthSchema";
import { registerAuthSchema } from "../_schemas/registerAuthSchema";
import { registerBarbeiroSchema, RegisterBarbeiroSchemaType } from "../_schemas/registerBarbeiroSchema";
import { registerBarberService, registerUserService } from "../_services/registerService";


export async function registerUser(payload: RegisterAuthSchemaType){
  try {
    
    const parsed = registerAuthSchema.safeParse(payload);
    if (!parsed.success) {
      return { success: false, message: 'Dados de registro inválidos' };
    }

    const emailExists = await User.findOne({ email: payload.email });
    if (emailExists) {
      return { success: false, message: 'Email já registrado' };
    }

    const result = await registerUserService(parsed.data);
    return result;
  } catch (error: any) {
    console.error('Erro em registerUser:', error);
    return { success: false, message: 'Erro ao registrar usuário' };
  }
}

export async function registerBarber(payload: RegisterBarbeiroSchemaType){
  try {

    const parsed = registerBarbeiroSchema.safeParse(payload);
    if (!parsed.success) {
      return { success: false, message: 'Dados de registro inválidos' };
    }


    const emailExists = await Barbeiro.findOne({ email: payload.email });
    if (emailExists) {
      return { success: false, message: 'Email já registrado' };
    }

    const cpfExists = await Barbeiro.findOne({ cpf: payload.cpf });
    if (cpfExists) {
      return { success: false, message: 'CPF já registrado' };
    }

    const barbeariaExists = await Barbeiro.findOne({ establishmentName: payload.establishmentName });
    if (barbeariaExists) {
      return { success: false, message: 'Barbearia já registrada' };
    }

    const result = await registerBarberService(parsed.data);
    return result;
  } catch (error: any) {
    console.error('Erro em registerBarber:', error);
    return { success: false, message: 'Erro ao registrar barbeiro' };
  }
}
