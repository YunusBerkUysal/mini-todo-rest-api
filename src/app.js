const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const requestLogger = require('./middlewares/logger.middleware');
const { notFoundHandler, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());

app.use(requestLogger);

app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('Mini Todo REST API Başarıyla Çalışıyor!');
});

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;