const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const VideogameRoutes = require('./Videogame');
const GenreRoutes = require('./Genre');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/Videogame', VideogameRoutes)
router.use('/Genre', GenreRoutes)

module.exports = router;
