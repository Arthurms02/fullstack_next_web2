"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { registerAuthSchema, RegisterAuthSchemaType } from "@/app/register/_schemas/registerAuthSchema"
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { Controller, useForm } from "react-hook-form"
import { registerUser } from "@/app/register/_actions/registerActions"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const form = useForm<RegisterAuthSchemaType>({
    resolver: zodResolver(registerAuthSchema),
    defaultValues:{
      name:"",
      email:"",
      password:"",
      confirmPassword:"",
      role:"client"
    },
  });

  async function onSubmit(data: RegisterAuthSchemaType) {
    const result = await registerUser(data);

    if (!result.success) {
      toast.error(result.message, { position: "top-center" });
      return;
    }

    toast.success(result.message, { position: "top-center" });
    router.push("/login");
  }

  return (
    <form
      id="register-form"
      className={cn("flex flex-col", className)}
      {...props}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Faça seu cadastro</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Preencha os campos abaixo para criar sua conta.
          </p>
        </div>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-form">Nome Completo</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Ex.: Guizera"
                required
                className="bg-black/30 backdrop-blur-sm border  rounded-sm p-5 shadow-sm text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-stone-700"
                {...field}
              />
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-form">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                required
                className="bg-black/30 backdrop-blur-sm border  rounded-sm p-5 shadow-sm text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-stone-700"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="role"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="role">Tipo de conta</FieldLabel>
              <NativeSelect id="role" className="w-full" {...field}>
                <NativeSelectOption value="client">Cliente</NativeSelectOption>
                <NativeSelectOption value="barber">Barbeiro</NativeSelectOption>
              </NativeSelect>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-form">Senha</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                className="bg-black/30 backdrop-blur-sm border  rounded-sm p-5 shadow-sm text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-stone-700"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <FieldDescription>A senha deve ter pelo menos 6 caracteres.</FieldDescription>
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-form">Confirme a senha</FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                required
                className="bg-black/30 backdrop-blur-sm border rounded-sm p-5 shadow-sm text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-stone-700"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <FieldDescription>Digite a senha novamente.</FieldDescription>
        <Field>
          <Button
            type="submit"
            form="register-form"
            className="w-full bg-gradient-to-r from-orange-200 to-amber-950 text-black/50 rounded-sm p-5 shadow-lg hover:from-stone-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Criar conta
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-5 text-center">
            Já possui uma conta? <Link href="/login">Faça login</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
