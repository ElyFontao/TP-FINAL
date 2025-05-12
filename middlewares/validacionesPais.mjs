// Importamos la función "body" que nos permite validar campos del cuerpo (body) de un formulario
import { body } from 'express-validator';

// Creamos un arreglo de validaciones que exportamos como middleware
export const validacionesPais = [

  // Validación: el nombre oficial en español debe tener entre 3 y 90 caracteres
  body('name.spa.official')
    .isLength({ min: 3, max: 90 })
    .withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.'),

  // Validación personalizada: cada capital debe tener entre 3 y 90 caracteres
  body('capital')
    .custom((value) => {
      const arr = value.split(',').map(s => s.trim()); // Separa por coma y limpia espacios
      return arr.every(c => c.length >= 3 && c.length <= 90); // Verifica cada capital
    })
    .withMessage('Cada capital debe tener entre 3 y 90 caracteres.'),

  // Validación personalizada: cada código de frontera debe tener exactamente 3 letras mayúsculas (ej: ARG, BRA)
  body('borders')
    .custom((value) => {
      const arr = value.split(',').map(s => s.trim());
      return arr.every(code => /^[A-Z]{3}$/.test(code)); // Verifica con expresión regular
    })
    .withMessage('Cada código de frontera debe ser de 3 letras mayúsculas.'),

  // Validación: el área debe ser un número decimal positivo
  body('area')
    .isFloat({ min: 0 })
    .withMessage('El área debe ser un número positivo.'),

  // Validación: la población debe ser un número entero positivo
  body('population')
    .isInt({ min: 0 })
    .withMessage('La población debe ser un número entero positivo.'),

  // Validación (opcional): el índice Gini, si se carga, debe estar entre 0 y 100
  body('gini')
    .optional() // No es obligatorio, pero si se ingresa debe cumplir la validación
    .isFloat({ min: 0, max: 100 })
    .withMessage('El índice Gini debe ser un número entre 0 y 100.')
];
