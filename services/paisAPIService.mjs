import { Pais } from '../models/paisModel.mjs';
import axios from 'axios';

const URL_API = 'https://restcountries.com/v3.1/all';

export const cargarPaisesDesdeAPI = async () => {
  try {
    const { data } = await axios.get(URL_API);
    console.log(`🌍 Total países recibidos: ${data.length}`);

    const paisesConEspañol = data.filter(p => p.languages && p.languages.spa);
    console.log(`🗣️ Países con idioma español: ${paisesConEspañol.length}`);

    const camposAEliminar = [
      'translations', 'tld', 'cca2', 'ccn3', 'cca3', 'cioc',
      'idd', 'altSpellings', 'car', 'coatOfArms', 'postalCode', 'demonyms'
    ];

    for (const pais of paisesConEspañol) {
      // Eliminar campos innecesarios
      camposAEliminar.forEach(campo => delete pais[campo]);

      const nombreOficial = pais.translations?.spa?.official || pais.name?.common || 'Sin nombre';

      const nuevoPais = {
        name: { spa: { official: nombreOficial } },
        capital: pais.capital || [],
        borders: pais.borders || [],
        area: pais.area || 0,
        population: pais.population || 0,
        gini: pais.gini ? Object.values(pais.gini)[0] : undefined,
        timezones: pais.timezones || [],
        creador: 'Eli Fontao'
      };

      // Verificar si ya existe por nombre oficial
      const existe = await Pais.findOne({ 'name.spa.official': nuevoPais.name.spa.official });
      if (!existe) {
        await Pais.create(nuevoPais);
        console.log(`✅ Guardado: ${nuevoPais.name.spa.official}`);
      } else {
        console.log(`⏭️ Ya existe: ${nuevoPais.name.spa.official}`);
      }
    }

    console.log('✔️ Finalizado');
  } catch (error) {
    console.error('❌ Error al cargar países desde la API:', error.message);
  }
};
