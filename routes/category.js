const express = require('express');
const controller = require('../controllers/category');
const passport = require('passport');

const router = express.Router();

// api/category
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
// api/category/:id
router.get('/:id', controller.getById);
// api/category/:id
router.delete('/:id', controller.remove);
// api/category
router.post('/', controller.create);
// api/category/:id
router.patch('/:id', controller.update);

module.exports = router;