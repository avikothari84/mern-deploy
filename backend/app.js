const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

const { MONGODB_URI, PORT } = process.env;
// middleware
const corsOptions = {
    origin: ["http://localhost:3000","https://sp-enterprises-ledger.onrender.com"] ,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}
app.use(express.json());

app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })

app.use(cors(corsOptions));

// connect MongoDB
mongoose.connect(MONGODB_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`App is Listening on PORT ${PORT}`);
    })
}).catch(err => {
    console.log(err);
});

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);

// route
app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});
