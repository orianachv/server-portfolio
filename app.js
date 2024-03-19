require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const cors = require('cors');


app.use(cors());
  
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
    to: process.env.EMAIL_USER,
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
