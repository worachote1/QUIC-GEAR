const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    imgPath: {
        type: String,
        default: "default-avatar-1.jpg"
    },
    role: {
        type: String,
        default: 'user'
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    bank : {
        type: String,
        default: '',
    },
    account_number: {
        type: String,
        default: '',
    },
    account_name : {
        type: String,
        default: '',
    },
    coins: {
        type: Number,
        default: 0
    },
    isGoogleAccount: {
        type: Boolean
    },
    favList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product', // the name you use when calling mongoose.model('product', productSchema)
            required: true
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// userSchema.pre('save', async function (next) {
//     if(!this.isModified('password')) {
//         next();
//     }

//     this.password = await bcrypt.hash(this.password, 10);
// });

// userSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.methods.getJwtToken = function () {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_TIME
//     });
// };
   
module.exports = mongoose.model('user', userSchema); 