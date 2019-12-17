const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spaceSchema = new Schema({
    host: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    nameSpace: String,
    place: String,
    surface: Number,
    capacityPlace: Number,
    description: String,
    town: String,
    

}, {
    timestamps: true
})

const Space = mongoose.model('Space', spaceSchema);
module.exports = Space;