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
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}
app.use(express.json());
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
