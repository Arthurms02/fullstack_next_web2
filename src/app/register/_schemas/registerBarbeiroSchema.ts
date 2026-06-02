import { z } from "zod";

export const registerBarbeiroSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100),
  role: z.literal("barber"),
  establishmentName: z.string().min(2).max(100),
  cpf: z.string().min(11).max(14),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});


export type RegisterBarbeiroSchemaType = z.infer<typeof registerBarbeiroSchema>;