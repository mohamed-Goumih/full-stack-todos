import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost', // ou votre adresse de serveur
  user: 'root',
  password: '',
  database: 'todos-express'
});

connection.connect(error => {
  if (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

export default connection;
