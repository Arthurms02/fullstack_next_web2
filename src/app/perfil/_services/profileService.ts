import { ProfileSchemaType } from '../_schemas/profileSchema';
import dbConnect from '@/lib/db';
import Profile from '@/models/Profile';
import Barbeiro from '@/models/Barbeiro';

export async function updateProfileService(payload: ProfileSchemaType, userId?: string){
  await dbConnect();

  try {
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }

    // Update or create profile
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { avatar: payload.avatar, phone: payload.phone, bio: payload.bio },
      { upsert: true, new: true }
    );

    // If barber-specific fields provided, update Barbeiro document
    if (payload.cnpj || payload.establishmentName) {
    // try find existing Barbeiro by user email or cnpj
      const update: any = {};
      if (payload.name) update.name = payload.name;
      if (payload.email) update.email = payload.email;
      if (payload.cnpj) update.cnpj = payload.cnpj;
      if (payload.establishmentName) update.establishmentName = payload.establishmentName;

      // Try to find by cnpj first
      let barbeiro = null;
      if (payload.cnpj) barbeiro = await Barbeiro.findOne({ cnpj: payload.cnpj });

      if (!barbeiro && payload.email) barbeiro = await Barbeiro.findOne({ email: payload.email });

      if (barbeiro) {
        await Barbeiro.updateOne({ _id: barbeiro._id }, update);
      } else if (payload.email && payload.name && payload.cnpj && payload.establishmentName) {
        // If no barber found and enough data, create a lightweight barber record without password
        await Barbeiro.create({
          name: payload.name,
          email: payload.email,
          password: 'changeme',
          establishmentName: payload.establishmentName,
          cnpj: payload.cnpj, // Using cnpj as cnpj for simplicity, adjust as needed
        });
      }
    }

    return profile;
  } catch (err) {
    console.error('Erro ao atualizar perfil', err);
    throw err;
  }
}
