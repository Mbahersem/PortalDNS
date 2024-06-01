const router = require('express').Router();
const controller = require('./controller');

router.get('/list-dns', controller.getDNS);

router.post('/add-dns', controller.addDNS);

router.get('/stop-dns');

module.exports = router;