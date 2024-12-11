const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'sistema_compras',
});

app.get('/api/compras', (req, res) => {
    const query = 'SELECT * FROM Compras';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al consultar la base de datos', error);
            res.status(500).send('Error del servidor');
        } else {
            res.json(results);
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
