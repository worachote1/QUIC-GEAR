const express = require("express");
const app = express();
const QRCode = require('qrcode');
const generatePayload = require('promptpay-qr');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/genPromtpayQR',(req,res) => {
    const amount = parseFloat(req.body.amount);
    const mobileNumber = '0942541545';
    const payload = generatePayload(mobileNumber , { amount });
    const option = {
        color : {
            dark : '#000',
            light : '#fff'
        }
    }; 
    QRCode.toDataURL(payload, option, (err,url) => {
        if (err){
            console.log("gen promtpayQR fail !!");
            return res.status(400).json({
                msg_err : err
            })
        }
        return res.status(200).json({
            msg : "gen promtpayQR success !!",
            res_url : url
        })
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server's running on port ${process.env.PORT}`);
})

