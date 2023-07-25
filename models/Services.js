const mongoose = require('mongoose');
const shortId = require('shortid');

const activeServiceSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortId.generate,
  },
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  servicer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const completedServiceSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortId.generate,
  },
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  finishDate: {
    type: Date,
    default: Date.now,
  },
  servicer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const activeService = mongoose.model('active-service', activeServiceSchema);
const completedService = mongoose.model(
  'completed-service',
  completedServiceSchema
);

exports.activeService = activeService;
exports.completedService = completedService;
