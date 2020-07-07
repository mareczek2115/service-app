const mongoose = require('mongoose');
const shortId = require('shortid');

const doneServiceSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: shortId.generate
    },
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    finishDate: {
        type: Date,
        default: Date.now
    },
    servicer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const doneService = mongoose.model('doneService', doneServiceSchema);

module.exports = doneService;