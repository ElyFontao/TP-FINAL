// Importamos los middlewares de validación para los formularios
import { validacionesPais } from '../middlewares/validacionesPais.mjs';

// Importamos funciones auxiliares de express-validator (aunque en este archivo no se usa directamente)
import { validationResult } from 'express-validator';

// Importamos Express para crear el enrutador
import express from 'express';

// Importamos todas las funciones que controlan la lógica de los países
import {
  listarPaises,                // Mostrar el dashboard con la lista de países
  mostrarFormularioAgregar,    // Mostrar el formulario para agregar un nuevo país
  guardarPais,                 // Procesar el formulario de nuevo país
  mostrarFormularioEditar,     // Mostrar el formulario para editar un país existente
  actualizarPaisExistente,     // Procesar la edición del país
  eliminarPaisExistente        // Eliminar un país
} from '../controllers/paisesController.mjs';

// Creamos una instancia de Router de Express para agrupar todas las rutas
const router = express.Router();


// ========================================
// Definición de rutas (GET y POST)
// ========================================

// Ruta para ver el listado (dashboard)
router.get('/paises', listarPaises);

// Ruta para mostrar el formulario de agregado
router.get('/paises/agregar', mostrarFormularioAgregar);

// Ruta para procesar el agregado del país (con validaciones)
router.post('/paises/agregar', validacionesPais, guardarPais);

// Ruta para mostrar el formulario de edición de un país
router.get('/paises/editar/:id', mostrarFormularioEditar);

// Ruta para procesar la edición del país (con validaciones)
router.post('/paises/editar/:id', validacionesPais, actualizarPaisExistente);

// Ruta para eliminar un país por ID
router.post('/paises/eliminar/:id', eliminarPaisExistente);

// Exportamos las rutas para usarlas en el servidor principal (app.mjs)
export default router;
