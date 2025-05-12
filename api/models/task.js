// models/tarefa.js

import mongoose from 'mongoose';

const esquemaTarefa = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: false },
  concluida: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
}, {
  timestamps: true  // Adiciona automaticamente createdAt e updatedAt
});

const Tarefa = mongoose.model('Tarefa', esquemaTarefa);

export default Tarefa;  // Exportando corretamente o modelo
