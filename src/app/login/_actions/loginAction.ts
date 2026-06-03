
import type { LoginAuthSchemaType } from "../_schemas/loginAuthSchema";
import { LoginAuthSchema } from "../_schemas/loginAuthSchema";
import { loginUserService } from "../_services/loginService";
import { toast } from 'sonner';



export async function loginUser(payload: LoginAuthSchemaType){
  const parsed = LoginAuthSchema.safeParse(payload);

  if(!parsed.success){
    toast.error('Dados de login inválidos',{ position: "top-center" });
    return;
  }
  
  await loginUserService(parsed.data);
}