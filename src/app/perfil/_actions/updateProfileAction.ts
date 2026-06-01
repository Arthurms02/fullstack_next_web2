'use server';

import { profileSchema, ProfileSchemaType } from '../_schemas/profileSchema';
import { updateProfileService } from '../_services/profileService';
import { toast } from 'sonner';

export async function updateProfile(payload: ProfileSchemaType & { userId?: string }){
  const parsed = profileSchema.safeParse(payload);
  if(!parsed.success){
    toast.error('Dados inválidos para atualizar perfil',{ position: 'top-center' });
    return;
  }

  await updateProfileService(parsed.data, payload.userId);
}
