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
import Link from "next/dist/client/link"


export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
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

  function onSubmit(data: RegisterAuthSchemaType) {
    registerUser(data);
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
                placeholder="John Doe"
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
                placeholder="m@example.com"
                required
                className="bg-black/30 backdrop-blur-sm border  rounded-sm p-5 shadow-sm text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-stone-700"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-form">Password</FieldLabel>
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
        <FieldDescription>Must be at least 8 characters long.</FieldDescription>
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-form">Confirm Password</FieldLabel>
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
            Create Account
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-5 text-center">
            Já possui uma conta? <Link href="/login" className="text-white underline-offset-4 hover:text-stone-300">
              Faça login
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
