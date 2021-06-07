const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth');
const { 
  getAllRequest, 
  createRequest, 
  updateRequest, 
  getRequestById 
} = require('../controllers/request');

router.param('requestId', protect, getRequestById);

router.get('/', protect, getAllRequest);
router.post('/create', protect, createRequest);
router.put('/update/:requestId', protect, updateRequest);

module.exports = router;
