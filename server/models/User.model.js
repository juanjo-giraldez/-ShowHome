const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    lastName: String,
    role: {
        type: String,
        required: true,
        enum: ['explorer','host', 'creator']
    },
    // town,
    // hobby
    
   

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User;


//  town: String,
//      place: String,
//      surface: Number,
//      capacityPlace: Number,
//      hobby: String
