const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000' // Solo permite solicitudes de este origen
  }));
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configura el transporte de correo
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'chacon.oriana.19@gmail.com', 
    pass: 'bscayyyavmnuolsv' 
  }
});

// Ruta para manejar el formulario de contacto
app.post('/contacto', (req, res) => {
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
