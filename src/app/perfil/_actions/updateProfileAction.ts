'use server';

import { profileSchema, ProfileSchemaType } from '../_schemas/profileSchema';
import { updateProfileService } from '../_services/profileService';

export async function updateProfile(payload: ProfileSchemaType & { userId?: string }) {
  const parsed = profileSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error('Dados inválidos para atualizar perfil');
  }

  if (!payload.userId) {
    throw new Error('Usuário não autenticado');
  }

  if (!parsed.data.cpf && !parsed.data.establishmentName) {
    throw new Error('Para atualizar o perfil de barbeiro, CPF ou nome do estabelecimento é obrigatório');
  }

  return await updateProfileService(parsed.data, payload.userId);
}
