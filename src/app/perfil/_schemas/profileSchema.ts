import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  cpf: z.string().optional(),
  rg: z.string().optional(),
  birthDate: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  establishmentName: z.string().optional(),
  establishmentPhone: z.string().optional(),
  cep: z.string().optional(),
  address: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  specialties: z.string().optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().optional(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
