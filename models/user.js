const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: String, maxlength: 200, index: true, unique: true },
    profile: Buffer
});

// userSchema.static('updateActivations', function(userId) {
//     this.findByIdAndUpdate(userId, { $inc: { acts: 1 }}, function(error) {
//         if(error) {
//             console.log('### updateActivations ###');
//             console.log(error);
//         }
//     });
// });

module.exports = mongoose.model('User', userSchema);
