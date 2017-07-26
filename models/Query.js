const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


const querySchema = new Schema({
  term: {
    type: String,
    required: true
  },
  when: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Query', querySchema);