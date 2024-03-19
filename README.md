# Aplicación de Contacto Express

Esta aplicación de Express proporciona un endpoint de API para enviar mensajes de correo electrónico a través de un formulario de contacto. Utiliza `nodemailer` para el envío de correos y `body-parser` para procesar las solicitudes entrantes.

## Requisitos Previos

Para ejecutar este proyecto, es necesario tener instalados Node.js y npm. Puedes obtenerlos visitando [nodejs.org](https://nodejs.org/).

## Configuración del Proyecto

1. **Instalar Dependencias**

   Después de obtener el proyecto, navega al directorio del mismo y ejecuta el siguiente comando para instalar las dependencias requeridas:

   ```bash
   npm install

### Configuración de variables de entorno

1. Copia el archivo `.env.example` en un nuevo archivo `.env` en la raíz del proyecto:

   ```bash
   cp .env.example .env

## Ejecución del Proyecto

Para iniciar el servidor localmente, sigue estos pasos:

1. Asegúrate de estar en el directorio raíz del proyecto.
2. Ejecuta el siguiente comando en la terminal:

    ```bash
    npm start
    ```

   Esto iniciará el servidor en el puerto `3001`. Asegúrate de que ningún otro servicio esté corriendo en este puerto.

   ## Ejemplo de Uso de la API

Una vez que el servidor está corriendo, puedes probar la funcionalidad de envío de correos electrónicos a través de la API. Aquí te muestro cómo hacer una solicitud POST a la ruta `/contact` utilizando `curl`, una herramienta de línea de comandos disponible en la mayoría de los sistemas operativos:

```bash
curl -X POST http://localhost:3001/contact\
-H "Content-Type: application/json" \
-d '{"nombre": "Tu Nombre", "email": "tuemail@example.com", "mensaje": "Este es un mensaje de prueba enviado desde el formulario de contacto."}'