'use server';

import { RegisterAuthSchemaType } from "../_schemas/registerAuthSchema";
import { registerAuthSchema } from "../_schemas/registerAuthSchema";
import { registerUserService } from "../_services/registerService";
import { toast } from 'sonner';

export async function registerUser(payload: RegisterAuthSchemaType){
  const parsed = registerAuthSchema.safeParse(payload);
  if(!parsed.success){
    toast.error('Dados de registro inválidos',{ position: "top-center" });
    return;
  }

  await registerUserService(parsed.data);
}
