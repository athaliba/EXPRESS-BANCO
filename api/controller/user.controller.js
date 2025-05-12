import bcrypt from 'bcrypt';
import Usuario from '../models/user.js';
import jwt from 'jsonwebtoken';
import servicoUsuario from '../services/user.service.js';

const registrar = async (req, res) => {
  console.log("Registrando usuário", req.body);

  if (!req.body || !req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).json({ mensagem: 'Nome de usuário, e-mail e senha são obrigatórios' });
  }

  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const senhaCriptografada = await bcrypt.hash(password, salt);

  try {
    const usuarioSalvo = await Usuario.create({
      username,
      email,
      password: senhaCriptografada,
    });

    // const novoUsuario = await servicoUsuario.registrarUsuario({ username, email, password });
    console.log("Usuário salvo", usuarioSalvo);
    res.status(200).json({ mensagem: 'Usuário registrado com sucesso' });
  } catch (erro) {
    console.error("Erro ao salvar usuário", erro);
    return res.status(500).json({ mensagem: `Erro ao salvar usuário: ${erro}` });
  }
};

const login = async (req, res) => {
  console.log("Fazendo login do usuário", req.body);

  if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({ mensagem: 'Nome de usuário, e-mail e senha são obrigatórios' });
  }

  const { username, email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ username }).select('+password');
    if (!usuario) {
      console.error("Usuário não encontrado", username);
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    if (usuario.email !== email) {
      console.error("E-mail não corresponde", email);
      return res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }

    const senhaCorreta = await bcrypt.compare(password, usuario.password);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }

    console.log("Usuário logado", usuario.username);
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
  } catch (erro) {
    console.error("Erro ao fazer login", erro);
    return res.status(500).json({ mensagem: `Erro ao fazer login: ${erro}` });
  }
};

export default { registrar, login };
