const { createUser,getUsers,getUsersByUserId } = require('./user.controller');
const router = require('express').Router();

router.post('/',createUser);

router.get('/',getUsers);

router.get('/:id',getUsersByUserId);

module.exports = router;

