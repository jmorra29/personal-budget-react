const mongoose = require("mongoose")

const budgetSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        unique: true,
    },
    budget: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    }
}, { collection: 'budget'})

module.exports = mongoose.model('budget', budgetSchema)