import { validationResult } from 'express-validator';

import {
    obtenerPaisesPorCreador,
    obtenerPaisPorId,
    crearPais,
    actualizarPais,
    eliminarPais
  } from '../repositories/PaisRepository.mjs';

  
  
  // Mostrar Dashboard
  export const listarPaises = async (req, res) => {
    try {
     const paises = await obtenerPaisesPorCreador(['Eli Fontao']);

  
      // Calcular totales (población, área, gini promedio)
      const totalPoblacion = paises.reduce((acc, p) => acc + (p.population || 0), 0);
      const totalArea = paises.reduce((acc, p) => acc + (p.area || 0), 0);
      const promedioGini = (
        paises.reduce((acc, p) => acc + (p.gini || 0), 0) / paises.filter(p => p.gini).length || 0
      ).toFixed(2);
  
      res.render('dashboard', { paises, totalPoblacion, totalArea, promedioGini });
    } catch (error) {
      res.status(500).send('Error al listar países');
    }
  };
  
  // Formulario agregar país
  export const mostrarFormularioAgregar = (req, res) => {
    res.render('agregar');
  };
  
  // Procesar nuevo país
 

  export const guardarPais = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).render('agregar', { errores: errores.array() });
    }
  
    try {
      const datos = {
        name: { spa: { official: req.body['name.spa.official'] } },
        capital: req.body.capital.split(',').map(c => c.trim()),
        borders: req.body.borders.split(',').map(b => b.trim().toUpperCase()),
        area: parseFloat(req.body.area),
        population: parseInt(req.body.population),
        gini: req.body.gini ? parseFloat(req.body.gini) : undefined,
        timezones: req.body.timezones ? req.body.timezones.split(',').map(t => t.trim()) : [],
        creador: 'Ely Fontao'
      };
  
      await crearPais(datos);
      res.redirect('/paises');
    } catch (error) {
      res.status(400).send('Error al agregar país: ' + error.message);
    }
  };
  
  
  // Formulario editar
  export const mostrarFormularioEditar = async (req, res) => {
    try {
      const pais = await obtenerPaisPorId(req.params.id);
      res.render('editar', { pais });
    } catch (error) {
      res.status(404).send('País no encontrado');
    }
  };
  
  //
  // Procesar edición
  export const actualizarPaisExistente = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      const pais = await obtenerPaisPorId(req.params.id); // Para mantener el formulario con valores cargados
      return res.status(400).render('editar', { pais, errores: errores.array() });
    }
  
    try {
      const datos = {
        name: { spa: { official: req.body['name.spa.official'] } },
        capital: req.body.capital.split(',').map(c => c.trim()),
        borders: req.body.borders.split(',').map(b => b.trim().toUpperCase()),
        area: parseFloat(req.body.area),
        population: parseInt(req.body.population),
        gini: req.body.gini ? parseFloat(req.body.gini) : undefined,
        timezones: req.body.timezones ? req.body.timezones.split(',').map(t => t.trim()) : []
      };
  
      await actualizarPais(req.params.id, datos);
      res.redirect('/paises');
    } catch (error) {
      res.status(400).send('Error al actualizar país: ' + error.message);
    }
  };
  
  // Eliminar país
  export const eliminarPaisExistente = async (req, res) => {
    try {
      await eliminarPais(req.params.id);
      res.redirect('/paises');
    } catch (error) {
      res.status(400).send('Error al eliminar país');
    }
  };
  


