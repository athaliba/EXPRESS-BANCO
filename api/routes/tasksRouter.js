import express from 'express';
import { 
  criarTarefa, 
  listarTodasTarefas, 
  obterTarefaPorId, 
  atualizarTarefa, 
  atualizarTarefaParcialmente, 
  deletarTarefa 
} from '../controller/taskController.js';  // Importando as funções corretamente

import proteger from '../middleware/authMiddleware.js'; // Middleware de autenticação

const roteador = express.Router();

// Rota POST para criar uma tarefa
roteador.post('/', proteger, criarTarefa); // Criar nova tarefa

// Rota GET para listar todas as tarefas
roteador.get('/', proteger, listarTodasTarefas); // Listar todas as tarefas

// Rota GET para detalhes de uma tarefa
roteador.get('/:id', proteger, obterTarefaPorId); // Detalhes de uma tarefa

// Rota PUT para atualizar todos os dados de uma tarefa
roteador.put('/:id', proteger, atualizarTarefa); // Atualizar todos os dados de uma tarefa

// Rota PATCH para atualizar parcialmente os dados de uma tarefa
roteador.patch('/:id', proteger, atualizarTarefaParcialmente); // Atualizar parcialmente os dados de uma tarefa

// Rota DELETE para deletar uma tarefa
roteador.delete('/:id', proteger, deletarTarefa); // Deletar uma tarefa

export default roteador;
