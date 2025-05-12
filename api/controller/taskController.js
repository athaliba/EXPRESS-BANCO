import Tarefa from '../models/task.js';
import mongoose from 'mongoose';

// Criar uma nova tarefa
export const criarTarefa = async (req, res) => {
  const { titulo, descricao } = req.body;
  
  if (!titulo) {
    return res.status(400).json({ mensagem: "O título da tarefa é obrigatório" });
  }

  try {
    const tarefa = new Tarefa({
      titulo,
      descricao,
      userId: req.userId,  // Associa a tarefa ao usuário autenticado
    });
    await tarefa.save();
    res.status(201).json({ mensagem: "Tarefa criada com sucesso", tarefa });
  } catch (erro) {
    res.status(500).json({ mensagem: `Erro ao criar tarefa: ${erro.message}` });
  }
};

// Listar todas as tarefas do usuário autenticado
export const listarTodasTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find({ userId: req.userId });
    res.status(200).json(tarefas);
  } catch (erro) {
    res.status(500).json({ mensagem: `Erro ao listar tarefas: ${erro.message}` });
  }
};

// Obter uma tarefa específica pelo ID
export const obterTarefaPorId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  try {
    const tarefa = await Tarefa.findOne({ _id: id, userId: req.userId });
    if (!tarefa) {
      return res.status(404).json({ mensagem: "Tarefa não encontrada" });
    }
    res.status(200).json(tarefa);
  } catch (erro) {
    res.status(500).json({ mensagem: `Erro ao buscar tarefa: ${erro.message}` });
  }
};

// Atualizar todos os dados de uma tarefa
export const atualizarTarefa = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, concluida } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  try {
    const tarefaAtualizada = await Tarefa.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { titulo, descricao, concluida },
      { new: true }
    );
    if (!tarefaAtualizada) {
      return res.status(404).json({ mensagem: "Tarefa não encontrada" });
    }
    res.status(200).json(tarefaAtualizada);
  } catch (erro) {
    res.status(500).json({ mensagem: `Erro ao atualizar tarefa: ${erro.message}` });
  }
};

// Atualizar parcialmente os dados de uma tarefa
export const atualizarTarefaParcialmente = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, concluida } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  try {
    const tarefaAtualizada = await Tarefa.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { titulo, descricao, concluida },
      { new: true, runValidators: true }
    );
    if (!tarefaAtualizada) {
      return res.status(404).json({ mensagem: "Tarefa não encontrada" });
    }
    res.status(200).json(tarefaAtualizada);
  } catch (erro) {
    res.status(500).json({ mensagem: `Erro ao atualizar tarefa: ${erro.message}` });
  }
};

// Deletar uma tarefa
export const deletarTarefa = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  try {
    const tarefa = await Tarefa.findOneAndDelete({ _id: id, userId: req.userId });
    if (!tarefa) {
      return res.status(404).json({ mensagem: "Tarefa não encontrada" });
    }
    res.status(200).json({ mensagem: "Tarefa deletada com sucesso" });
  } catch (erro) {
    res.status(500).json({ mensagem: `Erro ao deletar tarefa: ${erro.message}` });
  }
};
