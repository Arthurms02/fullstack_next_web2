import { Schema, models, model } from "mongoose";

const UsuarioSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['client', 'barber'], required: true },
}, {timestamps: true});

const User = models.User || model("User", UsuarioSchema);

export default User;