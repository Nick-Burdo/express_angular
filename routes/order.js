const express = require('express');
const controller = require('../controllers/order');

const router = express.Router();

// api/order
router.get('/', controller.getAll);
// api/order
router.post('/', controller.create);

module.exports = router;