const express = require('express');
const dataController = require('../controller/canciones');
const controller = require('../controller/canciones');

const router = express.Router();


// let multipart = require('connect-multiparty');
// let md_upload = multipart({ uploadDir: './upload/articles' });

router.post('/create', dataController.create);
router.get('/read/:nombre?', controller.read);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

module.exports = router;
