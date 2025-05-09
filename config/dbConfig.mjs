import mongoose from 'mongoose';

const uri = 'mongodb+srv://grupo-01:grupo01@cursadanodejs.ls9ii.mongodb.net/Node-js';

export const conectarDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('🟢 Conectado a MongoDB');
  } catch (error) {
    console.error('🔴 Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};
