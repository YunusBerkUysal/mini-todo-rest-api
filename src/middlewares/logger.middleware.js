const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} İsteği Geldi -> ${req.url}`);
    next();
};

module.exports = requestLogger;