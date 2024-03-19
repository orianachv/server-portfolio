require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const cors = require('cors');

const allowedOrigins = ['http://localhost:3000', 'https://server-portfolio-oriana.vercel.app/'];

app.use(cors({
    origin: function(origin, callback) {
        // Permitir solicitudes sin 'origin' (como aplicaciones móviles o curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'La política de CORS para este sitio no permite el acceso desde el origen especificado.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configura el transporte de correo
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Ruta para manejar el formulario de contacto
app.post('/contact', (req, res) => {
  const { nombre, email, mensaje } = req.body;
    console.log('entro en el servidor')
  // Configura el correo
  const mailOptions = {
    from: email,
    to: 'chacon.oriana.19@gmail.com', // Reemplaza con tu correo personal
    subject: `Nuevo mensaje de ${nombre}`,
    text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
  };

  // Envía el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Hubo un error al enviar el mensaje');
    } else {
      console.log('Mensaje enviado: ' + info.response);
      res.send('Mensaje enviado con éxito');
    }
  });
});

// Inicia el servidor en el puerto 3000
app.listen(3001, () => {
  console.log('Servidor escuchando en el puerto 3001');
});
