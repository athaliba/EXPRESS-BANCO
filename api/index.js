import express from 'express';
import dotenv from 'dotenv';
import db from './database/configdb.js';
import rotasUsuario from './routes/user.route.js';
import rotasExemplo from './routes/example.route.js';
import rotasTarefas from './routes/tasksRouter.js';
import Usuario from './models/user.js';
import { setMaxListeners } from 'events';
setMaxListeners(20); // permite até 20 ouvintes sem avisar


dotenv.config();

db.conectarBanco();

const app = express();

app.use(express.json());

app.use("/usuarios", rotasUsuario);
app.use("/rotaExemploSegura", rotasExemplo);
app.use("/tarefas", rotasTarefas);

app.get('/', (req, res) => {
  res.send({ mensagem: 'Olá, mundo!' });
});

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}/`);
});
