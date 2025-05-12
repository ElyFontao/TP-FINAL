// Importamos la función para obtener errores de validación de los formularios
import { validationResult } from 'express-validator';

// Importamos las funciones que interactúan con la base de datos desde el repositorio
import {
  obtenerPaisesPorCreador,
  obtenerPaisPorId,
  crearPais,
  actualizarPais,
  eliminarPais
} from '../repositories/PaisRepository.mjs';


// ==============================
// CONTROLADOR: MOSTRAR DASHBOARD
// ==============================
export const listarPaises = async (req, res) => {
  try {
    // Obtenemos todos los países creados por "Eli Fontao"
    const paises = await obtenerPaisesPorCreador(['Eli Fontao']);

    // Calculamos la población total de los países
    const totalPoblacion = paises.reduce((acc, p) => acc + (p.population || 0), 0);

    // Calculamos el área total
    const totalArea = paises.reduce((acc, p) => acc + (p.area || 0), 0);

    // Calculamos el promedio del índice Gini (solo si existe)
    const promedioGini = (
      paises.reduce((acc, p) => acc + (p.gini || 0), 0) / paises.filter(p => p.gini).length || 0
    ).toFixed(2);

    // Renderizamos la vista dashboard con los datos calculados
    res.render('dashboard', { paises, totalPoblacion, totalArea, promedioGini });
  } catch (error) {
    // Si ocurre un error, lo manejamos
    res.status(500).send('Error al listar países');
  }
};


// ==============================
// FORMULARIO PARA AGREGAR PAÍS
// ==============================
export const mostrarFormularioAgregar = (req, res) => {
  // Mostramos la vista con el formulario vacío
  res.render('agregar');
};


// ==============================
// PROCESAR AGREGADO DE PAÍS
// ==============================
export const guardarPais = async (req, res) => {
  // Validamos los datos del formulario
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    // Si hay errores, se los mostramos en la vista
    return res.status(400).render('agregar', { errores: errores.array() });
  }

  try {
    // Armamos el objeto con la estructura esperada por el modelo
    const datos = {
      name: { spa: { official: req.body['name.spa.official'] } },
      capital: req.body.capital.split(',').map(c => c.trim()),
      borders: req.body.borders.split(',').map(b => b.trim().toUpperCase()),
      area: parseFloat(req.body.area),
      population: parseInt(req.body.population),
      gini: req.body.gini ? parseFloat(req.body.gini) : undefined,
      timezones: req.body.timezones ? req.body.timezones.split(',').map(t => t.trim()) : [],
      creador: 'Eli Fontao' // 👈 se define el creador 
    };

    // Guardamos el nuevo país en la base
    await crearPais(datos);

    // Redirigimos al dashboard
    res.redirect('/paises');
  } catch (error) {
    res.status(400).send('Error al agregar país: ' + error.message);
  }
};


// ==============================
// FORMULARIO PARA EDITAR PAÍS
// ==============================
export const mostrarFormularioEditar = async (req, res) => {
  try {
    // Obtenemos el país por su ID
    const pais = await obtenerPaisPorId(req.params.id);

    // Mostramos el formulario con los datos cargados
    res.render('editar', { pais });
  } catch (error) {
    res.status(404).send('País no encontrado');
  }
};


// ==============================
// PROCESAR EDICIÓN DE PAÍS
// ==============================
export const actualizarPaisExistente = async (req, res) => {
  // Validamos los datos del formulario
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    const pais = await obtenerPaisPorId(req.params.id);
    return res.status(400).render('editar', { pais, errores: errores.array() });
  }

  try {
    // Armamos el objeto actualizado con los datos del formulario
    const datos = {
      name: { spa: { official: req.body['name.spa.official'] } },
      capital: req.body.capital.split(',').map(c => c.trim()),
      borders: req.body.borders.split(',').map(b => b.trim().toUpperCase()),
      area: parseFloat(req.body.area),
      population: parseInt(req.body.population),
      gini: req.body.gini ? parseFloat(req.body.gini) : undefined,
      timezones: req.body.timezones ? req.body.timezones.split(',').map(t => t.trim()) : []
    };

    // Actualizamos el país en la base
    await actualizarPais(req.params.id, datos);

    // Redirigimos al dashboard
    res.redirect('/paises');
  } catch (error) {
    res.status(400).send('Error al actualizar país: ' + error.message);
  }
};


// ==============================
// ELIMINAR UN PAÍS
// ==============================
export const eliminarPaisExistente = async (req, res) => {
  try {
    // Eliminamos el país por ID
    await eliminarPais(req.params.id);

    // Redirigimos al dashboard
    res.redirect('/paises');
  } catch (error) {
    res.status(400).send('Error al eliminar país');
  }
};
