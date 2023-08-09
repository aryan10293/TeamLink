const express = require("express");
const multer = require('multer');
const router = express.Router();
const authController = require("../controller/auth")
const crudController = require("../controller/crud")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/createaccount', authController.postCreateAccount)
router.post('/login', authController.postLogin)


router.put('/edit/:id', upload.single('video1'), crudController.editProfile)
module.exports = router;