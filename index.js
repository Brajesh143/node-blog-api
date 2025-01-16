const express = require('express')
const path = require('path')
require('dotenv').config()
const mongoose = require('mongoose')
const asyncHandlr = require('express-async-handlr')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')

const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')
const errorHandler = require("./middleware/errorHandler")
const logger = require('./utils/logger')
// const upload = multer({ dest: 'images/' })

const listenPort = process.env.PORT
const dbURI = process.env.DB_URL

const app = express()

const createDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;
        if (req.originalUrl.includes('/user')) {
            uploadPath = path.join(__dirname, 'public/uploads/users');
        } else if (req.originalUrl.includes('/blog')) {
            uploadPath = path.join(__dirname, 'public/uploads/blogs');
        } else if (req.originalUrl.includes('/product')) {
          uploadPath = path.join(__dirname, '/public/uploads/products');
        }

        // Create the directory if it doesn't exist
        createDirectory(uploadPath);

        cb(null, uploadPath);
      // cb(null, path.join(__dirname, 'public/uploads')); // Save files in the public/users directory
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.use(cors());

const corsOptions = {
  origin: 'http://localhost:3000', // replace with your frontend URL
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(upload.single('image'));
// Serve static files from the public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.use(errorHandler)

app.listen(listenPort, (err) => {
    if (err) {
        logger.error(err)
    }

    (async () => {
        try {
          await mongoose.connect(dbURI)
          logger.info("Database connected")
        } catch (err) {
          logger.error('Error occured', err)
        }
    })()

    logger.info(`server starts on port ${listenPort}`)
})