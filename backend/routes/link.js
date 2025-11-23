const express = require('express');
const {
  createShortLink,
  getAllLinks,
  getLinkStats,
  deleteLink,
  redirectByCode,
} = require('../controllers/link.js');

const router = express.Router();
router.get('/:code', redirectByCode);
router.post('/api/links', createShortLink);
router.get('/api/links', getAllLinks);
router.get('/api/links/:code', getLinkStats);
router.delete('/api/links/:code', deleteLink);

module.exports = router;
