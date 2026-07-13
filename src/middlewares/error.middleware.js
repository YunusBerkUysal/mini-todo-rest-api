const notFoundHandler = (req, res, next) => {
    res.status(404).json({ 
        message: `HATA: Aradığınız rota bulunamadı. (${req.method} ${req.originalUrl})` 
    });
};

const errorHandler = (err, req, res, next) => {
    console.error("Sistem Hatası Yakalandı:", err);
    res.status(500).json({ 
        message: "Sunucu içi beklenmeyen bir hata oluştu." 
    });
};

module.exports = { notFoundHandler, errorHandler };