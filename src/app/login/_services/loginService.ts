import {  LoginAuthSchemaType } from "../_schemas/loginAuthSchema";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from 'sonner';


export async function loginUserService(payload: LoginAuthSchemaType){

  const result = await signIn('credentials', {
    redirect: false,
    email: payload.email,
    password: payload.password
  });

  if (result?.error) {
    toast.error('Login invalido: ' + result.error,{ position: "top-center" });
  }else {
    toast.success('Login realizado com sucesso',{ position: "top-center" });
    redirect('/home');
  }
}