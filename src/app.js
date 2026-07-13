const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Mini Todo REST API Başarıyla Çalışıyor!');
});

module.exports = app;