const { default: mongoose } = require("mongoose");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    }
})
const User = mongoose.model('user-Info', userSchema);
module.exports = User