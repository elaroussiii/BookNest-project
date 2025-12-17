//Contiendra le code pour notre premier server node 
// on va créer un programme qui ecouter, enttendre des requêtes http et qui va y repondres

const http = require('http'); // Importation du module http
const server = http.createServer((req, res) => {
  res.end('voilà la réponse du serveur');
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Serveur lancé sur le port 3000');
});
//pour verifer que notre serveur est entrain d'ecouter le port 3000, 
//pour ce faire on utilise postman pour verifier avec la methode crud 