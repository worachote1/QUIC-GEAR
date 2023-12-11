const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection');

const http = require('http'); 
const socketIO = require('socket.io');

const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

// handle socket event
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('joinAuctionRoom', (auctionId) => {
      socket.join(`auction_${auctionId}`);
      console.log(`joining auction Id :${auctionId} `)
  });

  // Handle other Socket.IO events as needed
  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });
});

// Middleware to set up Socket.IO in the router
app.use((req, res, next) => {
    req.io = io;
    return next();
  });

// Now all routes & middleware will have access to req.io
// these file's express.Router() will have the req.io too.
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use("/api/auctionProducts", require('./routes/auctionProductsRoutes'));
app.use("/api/transactions", require('./routes/transactionsRoutes'));
app.use("/api/topup", require('./routes/topupRoutes'));
app.use("/api/upload", require('./routes/uploadRoutes'));
app.use("/api/auctionOrder", require('./routes/auctionOrderRoutes'));

connectDb();

server.listen(process.env.PORT, () => {
  console.log(`server's running on port ${process.env.PORT}`);
}) 
