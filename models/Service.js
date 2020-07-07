const mongoose = require('mongoose');

const beingServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startDate: {
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

const doneServiceSchema = new mongoose.Schema({
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

const beingService = mongoose.model('beingService', beingServiceSchema);
const doneService = mongoose.model('doneService', doneServiceSchema);

module.exports = beingService;
module.exports = doneService;