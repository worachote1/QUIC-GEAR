const express = require("express");
const app = express();
const QRCode = require('qrcode');
const generatePayload = require('promptpay-qr');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectData = require("./database");
const dotenv = require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
    console.log(`server's running on port ${process.env.PORT}`);
})

connectData();