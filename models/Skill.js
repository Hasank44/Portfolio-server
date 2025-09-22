const { Schema, model } = require('mongoose');

const skillSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    trim: true
  }

}, {
  timestamps: true
});

const Skill = model('Skill', skillSchema);
module.exports = Skill;