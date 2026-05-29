import { Schema, models, model } from "mongoose";


const BarbeiroSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  establishmentName: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
}, {timestamps: true});

const Barbeiro = models.Barbeiro || model("Barbeiro", BarbeiroSchema);

export default Barbeiro;