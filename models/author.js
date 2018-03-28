// The scheme defines an author has having String SchemaTypes for the first and family names,
// that are required and have a maximum of 100 characters, and Date fields for the date of birth and death.
// We've also declared a virtual for the AuthorSchema named "url" that returns the absolute URL required to get a
// particular instance of the model — we'll use the property in our templates whenever we need to get a link to a particular author.
// At the end of the module we export the model.

var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);
//Virtual for author's birthDAte
AuthorSchema
.virtual('d_birth')
.get(function () {
  return moment(this.date_of_birth).format('MMMM Do, YYYY');
});

//Virtual for author's death
AuthorSchema
.virtual('d_death')
.get(function () {
  return moment(this.date_of_death).format('MMMM Do, YYYY');
});


// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
