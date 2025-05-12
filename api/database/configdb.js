import mongoose from "mongoose";

const conectarBanco = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.mongo_db_Name,
    });
    console.log('MongoDB conectado com sucesso!');
  } catch (erro) {
    console.error('Erro ao conectar com o MongoDB', erro);
    process.exit(1); // Encerra o processo com erro
  }
}

export default { conectarBanco };
