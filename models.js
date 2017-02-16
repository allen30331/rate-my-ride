const mongoose = require('mongoose');


const driverSchema = mongoose.Schema({
  driverName: {type: String, required: true},
  company: {type: String, required: true},
  tagNumber: {type: String, required: true},
  city: {type: String, required: true},
  averageDriverRating: Number,
  //driverRating: [Number],
  //reviews:[String],
  descriptionSummary: Object,
  reviews: [{
    driverRating: Number,
    description: String, 
    comment: String,
    created: {type: Date, default: Date.now}
  }]
  //created: {type: Date, default: Date.now}
});




// const driverSchema = mongoose.Schema({
//   driverName: {type: String, required: true},
//   company: {type: String, required: true},
//   tagNumber: {type: String, required: true},
//   city: {type: String, required: true},
//   driverRating: {type: Number, required: true},
//   tags: {type: Object},
//   reviews: [{
//     rating: {type: Number, required: true},
//     tag: String,
//     comment: String,
//     created: {type: Date, default: Date.now}
//   } 
//   ]
// });


// driverRatingSchema.virtual('authorName').get(function() {
//   return `${this.author.firstName} ${this.author.lastName}`.trim();
// });

driverSchema.methods.apiRepr = function() {
  return {
      id: this._id,
      driverName: this.driverName,
      company: this.company,
      tagNumber: this.tagNumber,
      city: this.city,
      averageDriverRating: this.averageDriverRating,
      //driverRating: this.driverRating,
      descriptionSummary: this.descriptionSummary,
      reviews: this.reviews
      //created: this.created
  }
}

const Driver = mongoose.model('Driver', driverSchema);

module.exports = {Driver};