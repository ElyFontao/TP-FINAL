// Importamos Express, el framework que usamos para levantar el servidor web
import express from 'express';

// Importamos herramientas para manejar rutas de archivos (necesarias para trabajar con __dirname)
import path from 'path';
import { fileURLToPath } from 'url';

// Importamos la función para conectar la base de datos desde la carpeta config
import { conectarDB } from './config/dbConfig.mjs';

// Importamos las rutas de países, que están definidas en un archivo aparte
import paisesRoutes from './routes/paisesRoutes.mjs';

// Creamos la aplicación Express
const app = express();

// Definimos el puerto: tomamos el de entorno o usamos 3000 por defecto
const PORT = process.env.PORT || 3000;

// Estas dos líneas son para poder usar __dirname en ES Modules (porque no viene por defecto)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuramos EJS como motor de plantillas para las vistas
app.set('view engine', 'ejs');

// Le decimos a Express dónde están las vistas (archivos .ejs)
app.set('views', path.join(__dirname, 'views'));

// Hacemos pública la carpeta 'public' para poder servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Para poder leer datos enviados desde formularios (form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Para poder leer datos en formato JSON (si hiciera falta en el futuro)
app.use(express.json());

// Conectamos con la base de datos MongoDB
conectarDB();

// Usamos las rutas de países en la raíz del sitio ('/')
app.use('/', paisesRoutes);

// Iniciamos el servidor y mostramos un mensaje en la consola cuando está listo
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
