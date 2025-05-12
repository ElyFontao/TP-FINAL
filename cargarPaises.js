// Importamos las funciones necesarias para conectar a la base de datos y cargar los países desde la API.
import { conectarDB } from './config/dbConfig.mjs';
import { cargarPaisesDesdeAPI } from './services/paisAPIService.mjs';

// Definimos la función principal asincrónica que manejará el flujo de trabajo.
const main = async () => {
  // Conectamos a la base de datos.
  await conectarDB();

  // Cargamos los países desde la API externa.
  await cargarPaisesDesdeAPI();

  // Finalizamos el proceso una vez que se completan las tareas.
  process.exit();
};

// Llamamos a la función principal para ejecutar todo el proceso.
main();
