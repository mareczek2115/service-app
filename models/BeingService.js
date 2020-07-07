const mongoose = require('mongoose');
const shortId = require('shortid');

const beingServiceSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: shortId.generate,
    },
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

const beingService = mongoose.model('beingService', beingServiceSchema);

module.exports = beingService;