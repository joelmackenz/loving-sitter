const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');

const { getRequests, createRequest, updateRequest } = require('../controllers/request');

router.get('/', protect, getRequests);
router.post('/create', protect, createRequest);
router.put('/update', protect, updateRequest);

module.exports = router;
