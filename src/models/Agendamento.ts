import { Schema, models, model, Model, Types } from "mongoose";


export interface Agendamento{
	dataHora: Date;
	clienteId: Types.ObjectId;
	profissionalId: Types.ObjectId;
	status: 'pendente' | 'confirmado' | 'cancelado';
}

const AgendamentoSchema = new Schema<Agendamento>(
	{
		dataHora: { type: Date, required: true },
		clienteId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
		profissionalId: { type: Schema.Types.ObjectId, ref: 'Barbeiro', required: true },
		status: { type: String, enum: ['pendente', 'confirmado', 'cancelado'], default: 'pendente' },
	},
	{ timestamps: true }
);

// Índice composto único para prevenir duplicidade por profissional e horário
AgendamentoSchema.index({ dataHora: 1, profissionalId: 1 }, { unique: true });

const Agendamento = (models.Agendamento as Model<Agendamento>) || model<Agendamento>('Agendamento', AgendamentoSchema);

export default Agendamento;

