import { body } from 'express-validator';

export const validacionesPais = [
  body('name.spa.official')
    .isLength({ min: 3, max: 90 })
    .withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.'),
  
  body('capital')
    .custom((value) => {
      const arr = value.split(',').map(s => s.trim());
      return arr.every(c => c.length >= 3 && c.length <= 90);
    })
    .withMessage('Cada capital debe tener entre 3 y 90 caracteres.'),
  
  body('borders')
    .custom((value) => {
      const arr = value.split(',').map(s => s.trim());
      return arr.every(code => /^[A-Z]{3}$/.test(code));
    })
    .withMessage('Cada código de frontera debe ser de 3 letras mayúsculas.'),
  
  body('area')
    .isFloat({ min: 0 })
    .withMessage('El área debe ser un número positivo.'),

  body('population')
    .isInt({ min: 0 })
    .withMessage('La población debe ser un número entero positivo.'),

  body('gini')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('El índice Gini debe ser un número entre 0 y 100.')
];
