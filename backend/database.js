const mongoose = require('mongoose');

const connectData = () => {
    mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectData