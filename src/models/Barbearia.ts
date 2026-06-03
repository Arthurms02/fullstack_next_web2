import { Schema, models, model, Model, Types } from "mongoose";


export interface Barbearia {
  name: string;
  email: string;
  establishmentName: string;
  establishmentPhone?: string;
  cnpj: string;
  phone?: string;
  cep: string;
  address: string;
  specialties: {
    servico: string;
    duracao: string;
  }[];
  bio?: string;
  avatar?: string;
  number?: string;
  complement?: string;
  equipe?: Types.ObjectId[]; // Referência para os barbeiros associados
}

const BarbeariaSchema = new Schema<Barbearia>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    establishmentName: { type: String, required: true },
    establishmentPhone: { type: String },
    cnpj: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    cep: { type: String, required: true },
    address: { type: String, required: true },
    specialties: [{
      servico: { type: String, required: true },
      duracao: { type: String, required: true }
    }],
    bio: { type: String },
    avatar: { type: String },
    number: { type: String },
    complement: { type: String },
    equipe: [{ type: Schema.Types.ObjectId, ref: 'Barbeiro' }],
  },
  { timestamps: true }
);

const Barbearia = (models.Barbearia as Model<Barbearia>) || model<Barbearia>('Barbearia', BarbeariaSchema);

export default Barbearia;