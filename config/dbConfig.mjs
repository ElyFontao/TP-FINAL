// Importamos Mongoose, que es la librería para conectarnos y trabajar con MongoDB desde Node.js
import mongoose from 'mongoose';

// Definimos la URI de conexión a MongoDB 
// Incluye usuario, contraseña y nombre de la base de datos
const uri = 'mongodb+srv://grupo-01:grupo01@cursadanodejs.ls9ii.mongodb.net/Node-js';

// Exportamos una función async que se encarga de conectar a la base de datos
export const conectarDB = async () => {
  try {
    // Intentamos conectar usando Mongoose con algunas opciones de configuración modernas
    await mongoose.connect(uri, {
      useNewUrlParser: true,        // Usa el nuevo parser de URL (más estable)
      useUnifiedTopology: true      // Usa el nuevo sistema de gestión de conexiones
    });

    // Si la conexión funciona, mostramos un mensaje en consola
    console.log('🟢 Conectado a MongoDB');
  } catch (error) {
    // Si hay un error, lo mostramos y cortamos la ejecución del programa
    console.error('🔴 Error al conectar a MongoDB:', error.message);
    process.exit(1); // Sale del programa con código de error
  }
};
