import Usuario from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registrarUsuario = async ({ username, email, password }) => {
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    throw new Error('E-mail já cadastrado');
  }

  const salt = await bcrypt.genSalt(10);
  const senhaCriptografada = await bcrypt.hash(password, salt);

  const novoUsuario = await Usuario.create({
    username,
    email,
    password: senhaCriptografada,
  });

  console.log(`[${new Date().toISOString()}] Usuário registrado: ${email}`);
  return novoUsuario;
};

const logarUsuario = async ({ email, password }) => {
  const usuario = await Usuario.findOne({ email }).select('+password');
  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }

  const senhaValida = await bcrypt.compare(password, usuario.password);
  if (!senhaValida) {
    throw new Error('Senha inválida');
  }

  const token = jwt.sign(
    { id: usuario._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );

  const { password: _, ...usuarioSemSenha } = usuario.toObject();
  console.log(`[${new Date().toISOString()}] Usuário logado: ${email}`);
  return { token, usuario: usuarioSemSenha };
};

export default { registrarUsuario, logarUsuario };
