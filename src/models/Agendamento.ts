
import { Schema, models, model, Model, Document, Types } from "mongoose";

// Interface do Agendamento estendendo Document conforme arquitetura
export interface IAgendamento extends Document {
	dataHora: Date;
	clienteId: Types.ObjectId;
	profissionalId: Types.ObjectId;
	status: 'pendente' | 'confirmado' | 'cancelado';
}

const AgendamentoSchema = new Schema<IAgendamento>(
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

const Agendamento = (models.Agendamento as Model<IAgendamento>) || model<IAgendamento>('Agendamento', AgendamentoSchema);

export default Agendamento;

