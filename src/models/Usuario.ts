import { Schema, models, model } from "mongoose";
import type { User }  from "@/types/type";

const UsuarioSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['client', 'barber'], required: true },
}, {timestamps: true});

const User = models.User || model("User", UsuarioSchema);

export default User;