import { conectarDB } from './config/dbConfig.mjs';
import { cargarPaisesDesdeAPI } from './services/paisAPIService.mjs';

const main = async () => {
  await conectarDB();
  await cargarPaisesDesdeAPI();
  process.exit(); // Finaliza el proceso
};

main();
