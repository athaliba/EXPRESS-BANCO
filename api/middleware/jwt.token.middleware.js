import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ mensagem: 'Falha ao autenticar o token' });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (erro) {
    console.error("Erro ao verificar o token", erro);
    return res.status(500).json({ mensagem: `Erro ao verificar o token: ${erro}` });
  }
};

export default verificarToken;
