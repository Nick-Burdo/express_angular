const express = require('express');
const controller = require('../controllers/position');

const router = express.Router();

// api/position/:categoryId
router.get('/:categoryId', controller.getByCategoryId);
// api/position
router.post('/', controller.create);
// api/position/:id
router.patch('/:id', controller.update);
// api/position/:id
router.delete('/:id', controller.remove);

module.exports = router;