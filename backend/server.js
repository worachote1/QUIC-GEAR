const express = require("express");
const app = express();
const QRCode = require('qrcode');
const generatePayload = require('promptpay-qr');
const cors = require('cors');
const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection');

app.use(express.json());
app.use(cors());
app.use('/api/products', require('./routes/product'));
app.use('/api/users', require('./routes/user'));
app.use('/api/orders', require('./routes/order'));
app.use("/api/auctionProducts", require('./routes/auctionProductsRoutes'));
app.use("/api/transactions", require('./routes/transactionsRoutes'));

app.post('/genPromtpayQR',(req,res) => {
    const amount = parseFloat(req.body.amount);
    const mobileNumber = process.env.PROMTPAY_NUMBER;
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
            msg : "gen promtpayQR success !",
            res_url : url
        }) 
    })
})

connectDb();

app.listen(process.env.PORT, () => {
    console.log(`server's running on port ${process.env.PORT}`);
})