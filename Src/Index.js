// Const
const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'Public/Uploads'),
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
    }
});


// Initilizations
const app = express();

// Setting
app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(multer({
    storage,
    dest: path.join(__dirname, 'Public/Uploads'),
    limits: {fileSize: 2000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);  
        const extname = filetypes.test(path.extname(file.originalname)); 
        if(mimetype && extname){
            return cb(null, true);
        }
        cb("Error: Archivo debe ser una imagen valida");
    }
}).single('image')); 

// Static Files
app.use(express.static(path.join(__dirname, 'Public')));

// Routes Import
app.use(require('./Routes/Index.routes'));

// Listen the server
app.listen(app.get('port'), () => {
    console.log('Server listen to port', chalk.green(app.get('port')));
});