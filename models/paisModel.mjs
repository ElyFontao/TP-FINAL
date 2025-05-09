import mongoose from 'mongoose';

const paisSchema = new mongoose.Schema({
  name: {
    spa: {
      official: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 90
      }
    }
  },
  capital: {
    type: [String],
    validate: {
      validator: (arr) => arr.every(cap => cap.length >= 3 && cap.length <= 90),
      message: 'Cada capital debe tener entre 3 y 90 caracteres.'
    }
  },
  borders: {
    type: [String],
    validate: {
      validator: (arr) => arr.every(code => /^[A-Z]{3}$/.test(code)),
      message: 'Cada código de frontera debe tener 3 letras mayúsculas.'
    }
  },
  area: {
    type: Number,
    required: true,
    min: [0, 'El área debe ser un número positivo.']
  },
  population: {
    type: Number,
    required: true,
    min: [0, 'La población debe ser un número entero positivo.']
  },
  gini: {
    type: Number,
    min: 0,
    max: 100
  },
  timezones: {
    type: [String]
  },
  creador: {
    type: String,
    required: true
  }
});

export const Pais = mongoose.model('Pais', paisSchema, 'Grupo-01');
