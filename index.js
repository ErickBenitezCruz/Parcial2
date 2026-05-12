const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

app.get('/saludo', (req, res) => {
  res.json({
    mensaje: 'Hola, esta es mi ruta GET personalizada',
    estado: 'ok'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});