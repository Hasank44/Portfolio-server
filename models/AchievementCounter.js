const { Schema, model } = require('mongoose');

const achievementCounterSchema = new Schema({
  number: {
    type: Number,
  },
  label: {
    type: String,
    trim: true,
  }
}, {
    timestamps: true
});

const AchievementCounter = model('AchievementCounter', achievementCounterSchema);
module.exports = AchievementCounter;