import { Pais } from '../models/paisModel.mjs';

export const obtenerPaisesPorCreador = async (nombres) => {
  return await Pais.find({ creador: { nombres} });
};

export const obtenerPaisPorId = async (id) => {
  return await Pais.findById(id);
};

export const crearPais = async (datos) => {
  return await Pais.create(datos);
};

export const actualizarPais = async (id, datos) => {
  return await Pais.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
};

export const eliminarPais = async (id) => {
  return await Pais.findByIdAndDelete(id);
};
