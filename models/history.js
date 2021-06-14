const mongoose = require('mongoose');
const Schema = mongoose.Schema

const historySchema = new Schema({
    userId: String,
    date: Date,
    analyzedKeyword: String,
    analyzedCount:Number,
    positive: Number,
    negative: Number,
    neutral: Number,
});
module.exports = mongoose.model('history', historySchema, 'history');