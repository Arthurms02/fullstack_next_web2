"use server";

import { RegisterAuthSchemaType } from "../_schemas/registerAuthSchema";
import { registerAuthSchema } from "../_schemas/registerAuthSchema";
import { registerUserService } from "../_services/registerService";

export async function registerUser(payload: RegisterAuthSchemaType) {
  const parsed = registerAuthSchema.safeParse(payload);

  if (!parsed.success) {
    return { success: false, message: "Dados de registro inválidos" };
  }

  return registerUserService(parsed.data);
}
