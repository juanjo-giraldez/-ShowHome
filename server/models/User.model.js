const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    role: {
        type: String,
        required: true,
        enum: ['explorer','host', 'creator']
    },
    category: {
            type: String,
            required: true,
            enum: ['Cine', 'Música', 'Clases', 'Encuentros', 'Espectaculos']
    },
    imgUrl: String
}, 
    {
        timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User;



