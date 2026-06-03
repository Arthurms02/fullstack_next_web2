import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1).max(100),
  cnpj: z.string(),
  birthDate: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  establishmentName: z.string(),
  establishmentPhone: z.string().optional(),
  cep: z.string().max(10),
  address: z.string(),
  number: z.string().optional(),
  complement: z.string().optional(),
  specialties: z.array(
    z.object({
      servico: z.string(),
      duracao: z.string(), // verificar isso preciso em minutos
    })
  ).max(3),
  bio: z.string().max(500).optional(),
  avatar: z.string().optional(),
  equipe: z.array(z.object({
     barbeiro: z.string() 
    })).optional(), // Array de IDs dos barbeiros associados
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
