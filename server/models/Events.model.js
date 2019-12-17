const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    nameEvent: String,
    category: {
        type: String,
        enum: ['cinema', 'concert', 'monologue', 'masterClass', 'show']
    },
    email: String,
    town: String,
    capacityPlace: Number,
    description: String,
    
}, {
    timestamps: true
})


const Event = mongoose.model('Event', eventSchema);
module.exports = Event;