const express = require('express')
const multer = require('multer')
const path = require('path')
const { ShowInput, ViewMovie, addmovie, deletemovie, editmovie, updatemovie } = require('../controllers/moviecontrollers')
const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
router.get('/',ShowInput)
router.get('/viewMovie',ViewMovie)
router.post('/addmovierecord',upload.single('image'),addmovie)
router.get('/deletemovie',deletemovie)
router.get('/editmovie',editmovie)
router.post('/updatemovie',upload.single('image'),updatemovie)
module.exports = router