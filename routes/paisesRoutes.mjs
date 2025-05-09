import { validacionesPais } from '../middlewares/validacionesPais.mjs';
import { validationResult } from 'express-validator';

// //* Agregamos los middlewares en las rutas POST
// router.post('/paises/agregar', validacionesPais, guardarPais);
// router.post('/paises/editar/:id', validacionesPais, actualizarPaisExistente); 


import express from 'express';
import {
  listarPaises,
  mostrarFormularioAgregar,
  guardarPais,
  mostrarFormularioEditar,
  actualizarPaisExistente,
  eliminarPaisExistente
} from '../controllers/paisesController.mjs';

const router = express.Router();

router.get('/paises', listarPaises);
router.get('/paises/agregar', mostrarFormularioAgregar);
router.post('/paises/agregar', guardarPais);
router.get('/paises/editar/:id', mostrarFormularioEditar);
router.post('/paises/editar/:id', actualizarPaisExistente);
router.post('/paises/eliminar/:id', eliminarPaisExistente);

export default router;
