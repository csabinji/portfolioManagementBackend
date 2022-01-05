require("dotenv").config();
const express = require('express');
const connectDB = require(`./config/db`);
const bodyParser = require('body-parser');
const { PORT } = require(`./config/env`);
const stockRoute = require(`./components/stocks/stockRoute`)

connectDB();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(stockRoute);

const port = PORT || `4001`;
app.set(`port`, port);

app.listen(port, function () {
    console.log(`Server started on port ${port}`)
})

