import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { conectarDB } from './config/dbConfig.mjs';
import paisesRoutes from './routes/paisesRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

conectarDB();
app.use('/', paisesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
