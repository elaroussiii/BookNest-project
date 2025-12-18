/**
 * Contient le code de notre premier serveur Node.js
 * Ce serveur écoute les requêtes HTTP et y répond via Express
 */

const http = require('http');          // Import du module HTTP de Node
const app = require('./app');          // Import de l'application Express

/**
 * Normalisation du port
 * Permet d'utiliser soit un numéro de port, soit une valeur système
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val; // pipe nommé
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Définition du port
const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

// Création du serveur HTTP
const server = http.createServer(app);

/**
 * Gestion des erreurs du serveur
 */
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' nécessite des privilèges élevés.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' est déjà utilisé.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Événements du serveur
server.on('error', errorHandler);

server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string'
    ? 'pipe ' + address
    : 'port ' + port;
  console.log('Serveur lancé et à l’écoute sur le ' + bind);
});

// Lancement du serveur
server.listen(port);
