const { Schema, model } = require('mongoose');

const newsSchema = new Schema({
    email: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const FooterNews = model('FooterNews', newsSchema);
module.exports = FooterNews;