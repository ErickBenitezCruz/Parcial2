const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

app.get('/saludo', (req, res) => {
  res.json({
    mensaje: 'Hola, esta es una respuesta correcta del servidor'
  });
});

// Ruta para provocar un error y comprobar el manejador
app.get('/error', (req, res, next) => {
  const err = new Error('Se produjo un error intencional');
  err.status = 500;
  next(err);
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(err.status || 500).json({
    error: true,
    mensaje: err.message || 'Error interno del servidor'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});