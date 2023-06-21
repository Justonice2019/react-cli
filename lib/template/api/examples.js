const express = require('express');
const router = express.Router();
router.get('/get/string', (req, res) => {
  res.json({
    ...req.query,
  });
});
router.post('/post/string', (req, res) => {
  res.json({
    ...req.query,
    ...req.body,
  });
});
module.exports = router;
