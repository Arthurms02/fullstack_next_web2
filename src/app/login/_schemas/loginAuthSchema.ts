import {z} from 'zod';

export const LoginAuthSchema = z.object({
  email: z.email({message: 'Email inválido'}).max(150, {message: 'Email muito longo'}),
  password: z.string().min(6, {message: 'Password deve conter no mínimo 6 caracteres'}).max(150, {message: 'Password muito longa'}),
});

export type LoginAuthSchemaType = z.infer<typeof LoginAuthSchema>;