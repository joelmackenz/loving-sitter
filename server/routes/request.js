const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth');
const { validateCreateRequest } = require('../validate')
const { 
  getAllRequest, 
  createRequest, 
  updateRequest, 
  getRequestById 
} = require('../controllers/request');

router.param('requestId', getRequestById);

router.get('/', protect, getAllRequest);
router.post('/create', protect, validateCreateRequest, createRequest);
router.put('/update/:requestId', protect, updateRequest);

module.exports = router;
