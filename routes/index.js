const express = require('express');
const postRoutes = require('../routes/postRoutes');
const userRoutes = require('../routes/userRoutes');
const probeRoutes = require('../routes/probeRoutes');
const router = express();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/', probeRoutes);

module.exports = router;