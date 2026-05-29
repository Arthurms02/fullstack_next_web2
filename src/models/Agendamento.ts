
import { Schema, models, model, Model } from "mongoose";

// preciso tipar os criando um type para o Agendamento, e depois usar ele aqui, para garantir que os dados estão corretos
// Schema<Type> é a forma de tipar o schema, e model<Type> é a forma de tipar o model, para garantir que os dados estão corretos
interface Agendamento {
	user: Schema.Types.ObjectId;
	barbeiro: Schema.Types.ObjectId;
	date: Date;
	notes: string;
	status: 'scheduled' | 'completed' | 'cancelled';
}

const AgendamentoSchema = new Schema<Agendamento>({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
	barbeiro: { type: Schema.Types.ObjectId, ref: 'Barbeiro', required: true, unique: true },
	date: { type: Date, required: true },
	notes: { type: String },
	status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
}, { timestamps: true });

const Agendamento = (models.Agendamento as Model<Agendamento>) || model<Agendamento>('Agendamento', AgendamentoSchema);

export default Agendamento;

