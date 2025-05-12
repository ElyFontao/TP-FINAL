// Importamos el modelo Pais para poder guardar los países en la base de datos
import { Pais } from '../models/paisModel.mjs';

// Importamos Axios para hacer la solicitud HTTP a la API externa
import axios from 'axios';

// Definimos la URL de la API REST que trae información de todos los países
const URL_API = 'https://restcountries.com/v3.1/all';


// Exportamos la función principal que carga países desde la API
export const cargarPaisesDesdeAPI = async () => {
  try {
    // Hacemos la solicitud a la API
    const { data } = await axios.get(URL_API);
    console.log(`🌍 Total países recibidos: ${data.length}`);

    // Filtramos solo los países que tienen idioma español
    const paisesConEspañol = data.filter(p => p.languages && p.languages.spa);
    console.log(`🗣️ Países con idioma español: ${paisesConEspañol.length}`);

    // Definimos una lista de campos que queremos eliminar antes de guardar (no se usan en nuestro modelo)
    const camposAEliminar = [
      'translations', 'tld', 'cca2', 'ccn3', 'cca3', 'cioc',
      'idd', 'altSpellings', 'car', 'coatOfArms', 'postalCode', 'demonyms'
    ];

    // Iteramos por cada país filtrado
    for (const pais of paisesConEspañol) {

      // Eliminamos los campos innecesarios del objeto original
      camposAEliminar.forEach(campo => delete pais[campo]);

      // Obtenemos el nombre oficial en español (si no está, usamos el nombre común)
      const nombreOficial = pais.translations?.spa?.official || pais.name?.common || 'Sin nombre';

      // Creamos un nuevo objeto con los datos que sí vamos a guardar
      const nuevoPais = {
        name: { spa: { official: nombreOficial } },
        capital: pais.capital || [],
        borders: pais.borders || [],
        area: pais.area || 0,
        population: pais.population || 0,
        gini: pais.gini ? Object.values(pais.gini)[0] : undefined, // si hay índice Gini, lo tomamos
        timezones: pais.timezones || [],
        creador: 'Eli Fontao' // marcamos que este país fue cargado por vos
      };

      // Verificamos si ese país ya fue cargado (por nombre oficial en español)
      const existe = await Pais.findOne({ 'name.spa.official': nuevoPais.name.spa.official });

      if (!existe) {
        // Si no existe, lo guardamos en la base de datos
        await Pais.create(nuevoPais);
        console.log(`✅ Guardado: ${nuevoPais.name.spa.official}`);
      } else {
        // Si ya está en la base, no lo volvemos a guardar
        console.log(`⏭️ Ya existe: ${nuevoPais.name.spa.official}`);
      }
    }

    // Mensaje final cuando termina todo el proceso
    console.log('✔️ Finalizado');
  } catch (error) {
    // Si algo falla (ej. error de conexión), mostramos el error
    console.error('❌ Error al cargar países desde la API:', error.message);
  }
};
