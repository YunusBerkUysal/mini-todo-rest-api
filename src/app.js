const express = require('express');
const todoRoutes = require('./routes/todo.routes');

const app = express();

app.use(express.json());

app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('Mini Todo REST API Başarıyla Çalışıyor!');
});

module.exports = app;