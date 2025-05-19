import mongoose from "mongoose";

const esquemaUsuario = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Garante que o nome de usuário seja único
  },
  password: {
    type: String,
    required: true,
    select: false, // Não incluir a senha nas consultas por padrão
  },
  email: {
    type: String,
    required: true,
    unique: true, // Garante que o e-mail seja único
  },
});

const Usuario = mongoose.model("Usuario", esquemaUsuario);
export default Usuario;
