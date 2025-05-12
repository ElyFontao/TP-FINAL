
# 🌎 Gestor de Países Hispanohablantes

Aplicación web desarrollada con Node.js, Express y MongoDB que consume una API externa de países, filtra los que tienen idioma español y permite realizar operaciones CRUD sobre ellos.

---

## 🧱 Tecnologías utilizadas

- **Node.js** y **Express** para el servidor web
- **MongoDB** con **Mongoose** como base de datos
- **Axios** para el consumo de API externa
- **EJS** como motor de plantillas
- **CSS personalizado** (sin frameworks)
- Arquitectura **modular por capas**

---

## 📁 Estructura del proyecto

```
paises-app/
├── app.mjs                     # Servidor principal
├── config/
│   └── dbConfig.mjs           # Conexión a MongoDB
├── controllers/
│   └── paisesController.mjs   # Lógica del CRUD
├── models/
│   └── paisModel.mjs          # Esquema de país con Mongoose
├── repositories/
│   └── PaisRepository.mjs     # Acceso a la base de datos
├── routes/
│   └── paisesRoutes.mjs       # Rutas HTTP
├── services/
│   └── paisAPIService.mjs     # Consumo y procesamiento de API externa
├── views/
│   ├── agregar.ejs
│   ├── editar.ejs
│   ├── dashboard.ejs
│   ├── dashboardContenido.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── public/
│   └── css/
│       └── styles.css         # Estilos básicos
├── scripts/
│   ├── cargarPaises.js        # Ejecuta la carga desde la API
│   └── corregirNombre.js      # Corrige países con nombre plano (opcional)
└── README.md
```

---

## 🚀 Funcionalidades

- 🟢 Carga automática desde la API pública: [https://restcountries.com/v3.1/all](https://restcountries.com/v3.1/all)
- 🔍 Filtro: solo países que hablen español (`languages.spa`)
- 🧹 Limpieza: se eliminan propiedades innecesarias
- ✍️ Propiedad personalizada: `creador: "Eli Fontao"`
- 📋 Dashboard con:
  - Listado de países
  - Totales: población, área, promedio Gini
- 🛠️ Formularios para:
  - Agregar país
  - Editar país
  - Eliminar país

---

## ⚙️ Cómo ejecutar el proyecto

### 1. Clonar repositorio y entrar a la carpeta

```bash
git clone https://github.com/tu-usuario/paises-app.git
cd paises-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar conexión a MongoDB

Verificá que el archivo `config/dbConfig.mjs` contenga tu URI de MongoDB:

```js
const uri = 'mongodb+srv://grupo-01:grupo01@cursadanodejs.ls9ii.mongodb.net/Node-js';
```

### 4. Cargar países desde la API

```bash
node cargarPaises.js
```

> ⚠️ Se guardarán solo los países que no existan previamente y cuyo `creador` sea "Eli Fontao".

### 5. Iniciar la aplicación

```bash
npm start
```

Abrir en el navegador: [http://localhost:3000/paises](http://localhost:3000/paises)

---

## 🧪 Validaciones

Se utilizan validaciones en servidor mediante `express-validator`, incluyendo:

- Longitud del nombre y capital
- Formato de códigos de frontera
- Rangos válidos de área, población y Gini

Los errores se muestran al usuario si los datos ingresados son incorrectos.

---

## 👨‍💻 Autor

**Eli Fontao**

Proyecto realizado en el marco del trabajo práctico de la cátedra de Node.js.

---
