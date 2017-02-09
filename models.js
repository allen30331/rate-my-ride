const mongoose = require('mongoose');

const rateDriverSchema = mongoose.Schema({
  driverName: {type: String, required: true},
  company: {type: String, required: true},
  tagNumber: {type: Number, required: true},
  driverRating: {type: Number, required: true},
  tags: {type: String},
  content: {type: String},
  created: {type: Date, default: Date.now}
});


// rateDriverSchema.virtual('authorName').get(function() {
//   return `${this.author.firstName} ${this.author.lastName}`.trim();
// });

rateDriverSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    author: this.authorName,
    content: this.content,
    title: this.title,
    created: this.created
  };
}

const RateDriver = mongoose.model('RateDriver', rateDriverSchema);

module.exports = {RateDriver};