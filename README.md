# proyecto10_front

# 🎉 Plataforma de Eventos

Es una plataforma web donde los usuarios pueden iniciar sesión, explorar eventos disponibles, escoger asistir, tener su propia sección de eventos escogidos, crear eventos y poder ver una lista con los usuarios que van a asistir.
El usuario que es nuevo puede registrarse a la vez que automáticamente ya entra en la plataforma evitando así un paso de registro a login.

## 🚀 Características

- Autenticación de usuarios (registro / login) en un solo paso
- Explorar eventos
- Poder seleccionar eventos si es usuario autentificado
- Crear eventos si es usuario autentificado
- Acceso a una lista de eventos con los nombres de asistentes

## 🛠️ Tecnologías

- **Backend:** Node.js / Express
- **Base de datos:** MongoDB
- **Autenticación:** JWT
- **Encriptación de contraseñas:** Bcrypt
- **Frontend:** Javascript Vanille
- **Seguridad y configuración de acceso:** CORS
- **Herramienta de desarrollo:** Nodemon

## 🔧 Instalación

```bash
git clone [https://github.com/sarafontdevila/proyecto10_front.git](https://github.com/sarafontdevila/proyecto10_front.git)
git clone [https://github.com/sarafontdevila/proyecto10_FullStackJS.git](https://github.com/sarafontdevila/proyecto10_FullStackJS.git)
cd eventos
npm install
npm run dev

📋 Endpoints API

🔐 Autenticación
Método	Endpoint	Descripción	Body (JSON)
POST	/auth/register	Registrar un nuevo usuario	{ "nombre": "", "email": "", "password": "" }
POST	/auth/login	Iniciar sesión	{ "nombre": "", "email": "", "password": "" }

👤 Endpoints de Usuario
Método	Endpoint	Descripción	Body requerido	Autenticación

POST	/users/register	Registrar un nuevo usuario	{ "nombre": "", "email": "", "password": "", ... }	No
POST	/users/login	Iniciar sesión del usuario	{ "nombre": "","password": "" }	No

📅 Endpoints de Eventos
General
Método	Endpoint	Descripción	Autenticación	Body / Detalles

POST	/eventos/	Crear un nuevo evento	✅ Sí	multipart/form-data con imagen
DELETE	/eventos/:id	Eliminar un evento	✅ Sí	—

Asistentes
Método	Endpoint	Descripción	Autenticación	Body / Detalles

PUT	/eventos/:id/asistentes	Añadir usuario autenticado como asistente	✅ Sí	—
DELETE	/eventos/:id/asistentes/:userId	Quitar asistente por ID	✅ Sí	—
GET	/eventos/:id/asistentes	Obtener lista de asistentes del evento

## 📄 Licencia
---
Copyright © 2025 Sara Fontdevila
