const QRCode = require('qrcode');
const generatePayload = require('promptpay-qr');

const genPromtpayQR = (req, res) => {
    const amount = parseFloat(req.body.amount);
    const mobileNumber = process.env.PROMTPAY_NUMBER;
    const payload = generatePayload(mobileNumber, { amount });
    const option = {
        color: {
            dark: '#000',
            light: '#fff'
        }
    };
    QRCode.toDataURL(payload, option, (err, url) => {
        if (err) {
            console.log("gen promtpayQR fail !!");
            return res.status(400).json({
                msg_err: err
            })
        }
        return res.status(200).json({
            msg: "gen promtpayQR success !",
            res_url: url
        })
    })
}
module.exports = { genPromtpayQR }