const app = require('./app');

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Sunucu başarıyla başlatıldı: http://localhost:${PORT}`);
});