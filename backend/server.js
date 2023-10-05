const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection');

app.use(express.json());
app.use(cors());
// app.use("/api/upload", require('./routes/uploadRoutes'))
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use("/api/auctionProducts", require('./routes/auctionProductsRoutes'));
app.use("/api/transactions", require('./routes/transactionsRoutes'));
app.use("/api/topup", require('./routes/topupRoutes'));
app.use("/api/upload", require('./routes/uploadRoutes'));

connectDb();

app.listen(process.env.PORT, () => {
    console.log(`server's running on port ${process.env.PORT}`);
    console.log(`server's running on port ${process.env.PORT}`);
}) 