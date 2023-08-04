const express = require('express');
const fileupload = require('express-fileupload');
const path = require('path');
const app = express();

// Definir una ruta que reciba un parametro nombre de archivo para ser eliminado, deben usar el metodo delete.
// recuerden que este metodo no admite body, deben enviar el nombre por parametro en la url.
const fs = require('fs');

// Constante utilizada para conocer los tipos de archivo permitidos en la ruta upload
const extensionesPermitidas = ['','','']

// Constante para definir peso maximo del archivo a subir (valor expresado en MB)
const maximoPermitido = 3

app.use(express.json());
app.use(fileupload({createParentPath: true}));

app.listen(3000, () => console.log('Servidor en ejecucion'))

app.post('/upload', async (req, res) => {
  console.log(req.files);
  if(!req.files) {
    return res.status(400).json({succes: false, message: 'Por favor subir un archivo'});
  }
  const datosArchivo = req.files.archivo

  // Añadir los mimetype permitidos en un array y realizar la validacion con un includeso funcion similar
  if(datosArchivo.mimetype === 'image/png'  && datosArchivo.mimetype !== 'image/jpeg') {
    return res.status(400).json({succes: false, message: 'Subir un archivo con formato valido'});
  }
  
  const nombre = datosArchivo.name
  // obtener extension del archivo no fue necesario para este ejemplo pero si para futuras aplicaciones
  const {ext} = path.parse(nombre);
  console.log(ext);
  // fin obtener extención
  const marca = Date.now();
  const ruta = `${__dirname}/files/${marca}-${nombre}` 
  await datosArchivo.mv(ruta)
  res.json({succes: true, message: 'Ruta para subir archivo'});
})