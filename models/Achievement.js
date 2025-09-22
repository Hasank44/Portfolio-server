const { Schema, model } = require('mongoose');

const achievementSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
}, {
  timestamps: true
});


const Achievement = model('Achievement', achievementSchema);
module.exports = Achievement;
