const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const PhoneBook = require('./model/PhoneBook') 
const multer = require("multer")    
const path = require("path")

app.use(express.json())
app.use(cors())

// File uplaod folder
const UP_F = "./upload/";


//just commentsgit

//router use
app.use('/users/', require('./routers/userRoutes'))
app.use('/users/', require('./routers/phoneRoutes'))

// Define the storage
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, UP_F);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName =
          file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") +
          "-" +
          Date.now();
    
        cb(null, fileName + fileExt);
      },
    });

// Multer upload objects upload img with Multersed
// Prepare the final multer upload object
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000,
    },
    fileFilter: (req, file, cd) => {
        if (file.fieldname === "avatar") {
            if (
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpeg"
            ) {
                cd(null, true)
            } 
        } else if (file.fieldname === "doc") {
          if (file.mimetype === "application/pdf") {
              cd(null, true)
          } else {
            cd(new Error("Only .pdf foramte allowed"))
          }
          
       } else {
           cd (new Error("There was a unknown Error"))
       }
    }
});


//Application Route
app.post(
    "/file-upload",
    upload.fields([
      {
        name: "avatar",
        maxCount: 2,
      },
      {
        name: "doc",
        maxCount: 1,
      },
    ]),
    (req, res, next) => {
        console.log(req.files)
      res.send("success");
    }
);


// Default Error Handler
app.use((err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send("there was an uplaod error")
        } else {
            res.status(500).send(err.message)
        }
    } else {
        res.send("Success")
    }
})

//Database connection
const db = 'mongodb://localhost:27017/crud'
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('database connected')
})

//server setup by port
const PORT = 8000
app.listen(PORT, () => {
    console.log(`app listening ap port ${PORT}.....`);
})
