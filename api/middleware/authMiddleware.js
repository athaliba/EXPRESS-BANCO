import jwt from 'jsonwebtoken';

const proteger = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodificado.id;  // Grava o userId na requisição para uso nas rotas
    next();
  } catch (erro) {
    res.status(401).json({ mensagem: 'Token inválido' });
  }
};

export default proteger;
