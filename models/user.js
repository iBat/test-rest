const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: String, maxlength: 200, index: true, unique: true },
    profile: Buffer
});

module.exports = mongoose.model('User', userSchema);
