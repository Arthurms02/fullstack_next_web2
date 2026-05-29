import {z} from 'zod';

export const registerAuthSchema = z.object({
  name: z.string().min(2, {message: 'Digite seu nome'}).max(100, {message: 'Nome muito longo'}),
  email: z.email({message: 'Email inválido'}).max(100, {message: 'Email muito longo'}),
  password: z.string().min(6, {message: 'Crie um senha com no mínimo 6 caracteres'}).max(100, {message: 'Senha muito longa'}),
  confirmPassword: z.string().min(6, {message: 'As senhas não coincidem'}).max(100, {message: 'Senha muito longa'}),
  role: z.enum(['client', 'barber'], {message: 'Selecione um tipo de usuário'}),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});


export type RegisterAuthSchemaType = z.infer<typeof registerAuthSchema>;