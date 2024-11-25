const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getallbooks, storeBook ,getbook,order} = require('../Controllers/Book');

const {auth,isAdmin,isBuyer} = require('../Middlewares/Auth')

// Set up the multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename file to prevent overwriting
    }
});

// File filter to accept certain types of files (e.g., JPG and PNG)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); // Accept JPG/PNG images
    } else {
        cb(new Error('Invalid file type')); // Reject other file types
    }
};

// Initialize multer with storage configuration and file filter
const upload = multer({ storage, fileFilter });

// Routes
router.get('/getallbooks', getallbooks);
router.post('/getbookbyid', getbook);
router.post('/order', auth,isBuyer,order);
router.post('/storeBook',upload.single('file'),auth,isAdmin,storeBook);

module.exports = router;
