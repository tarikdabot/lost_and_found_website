const express = require('express');
const {
    deleteUser,
    getUser,
    signout,
    getUsers,
    test,
    updateUser,
} = require('../controller/user-controller.js');
const  verifyToken  = require('../util/verifyUser.js');

const router = express.Router();

router.get('/test', test);

router.put('/update/:userId', verifyToken, updateUser);  // This should be defined correctly
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);

module.exports = router;
