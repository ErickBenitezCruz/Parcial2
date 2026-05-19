const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const SECRET_KEY = 'clave_secreta_super_segura';

// Ruta pública
app.get('/', (req, res) => {
  res.send('Servidor JWT funcionando correctamente');
});

// Login: genera el token
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  if (usuario === 'admin' && password === '1234') {
    const token = jwt.sign(
      { usuario: 'admin', rol: 'administrador' },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.json({
      mensaje: 'Inicio de sesión correcto',
      token
    });
  }

  res.status(401).json({
    mensaje: 'Credenciales incorrectas'
  });
});

// Middleware para validar token
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      mensaje: 'No se proporcionó token'
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({
      mensaje: 'Formato de token inválido'
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: 'Token inválido o expirado'
    });
  }
}

// Ruta protegida
app.get('/privado', verificarToken, (req, res) => {
  res.json({
    mensaje: 'Acceso autorizado a la ruta protegida',
    usuario: req.usuario
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});