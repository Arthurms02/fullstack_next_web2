'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form";
import { LoginAuthSchema, LoginAuthSchemaType } from "@/app/login/_schemas/loginAuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/dist/client/link";
import { loginUser } from "../_actions/loginAction";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<LoginAuthSchemaType>({
    resolver: zodResolver(LoginAuthSchema),
    defaultValues:{
      email:"",
      password:"",
    },
  });


  function onSubmit(data: LoginAuthSchemaType) {
    loginUser(data);
  }


  return (
    <form
      id="form-login"
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold font-rye">Faça seu login</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Entrar na sua conta para personalizar sua experiência.
          </p>
        </div>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-login" className="font-rye">
                Email
              </FieldLabel>
              <Input
                id="form-login"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="m@example.com"
                {...field}
                required
                className="bg-black/30 backdrop-blur-sm border  rounded-sm p-6 shadow-sm text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-stone-700"
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
              <div className="flex items-center">
                <FieldLabel htmlFor="form-login" className="font-rye">
                  Password
                </FieldLabel>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="form-login"
                type="password"
                {...field}
                required
                className="bg-black/30 backdrop-blur-sm border  rounded-sm p-6 shadow-sm text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-stone-700"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit" form="form-login" className="w-full bg-gradient-to-r from-orange-200 to-amber-950 text-white rounded-sm p-6 shadow-lg hover:from-stone-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            Login
          </Button>
        </Field>
        <FieldSeparator></FieldSeparator>
        <Field>
          <FieldDescription className="text-center">
            Não possui uma conta?{" "}
            <Link href="/register" className="text-white underline-offset-4 hover:text-stone-300">
              Registre-se agora
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
