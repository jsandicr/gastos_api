const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/:email', authenticateToken, groupController.getGroupsByEmail);
router.get('/join/:code/:email', authenticateToken, groupController.joinGroup);
router.post('/add', authenticateToken, groupController.addGroup);
router.post('/leave/:code/:email', authenticateToken, groupController.leaveGroup);

module.exports = router;