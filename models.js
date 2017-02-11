const mongoose = require('mongoose');

const driverRatingSchema = mongoose.Schema({
  driverName: {type: String, required: true},
  company: {type: String, required: true},
  tagNumber: {type: Number, required: true},
  city: {type: String, required: true},
  driverRating: {type: Number, required: true},
  tags: {type: String},
  reviews: {
    rating: {type: Number, required: true},
    tag: String,
    review: String 
  },
  created: {type: Date, default: Date.now}
});


// driverRatingSchema.virtual('authorName').get(function() {
//   return `${this.author.firstName} ${this.author.lastName}`.trim();
// });

driverRatingSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    driverName: this.driverName,
    company: this.company,
    tagNumber: this.tagNumber,
    city: this.city,
    driverRating: this.driverRating,
    tags: this.tags,
    review: this.review,
    created: this.created
  };
}

const DriverRating = mongoose.model('DriverRating', driverRatingSchema);

module.exports = {DriverRating};