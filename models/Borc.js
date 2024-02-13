// models/Borc.js
const mongoose = require('mongoose');

const borcSchema = new mongoose.Schema({
    sirket_ismi: {
        type: String,
        required: true
    },
    bakiye: {
        type: Number,
        required: true
    },
    fatura_durumu: {
        type: Boolean,
    },
    tarih: {
        type: Date,
        required: true
    },
    vadesi: {
        type: Date,
    },
    odendi_mi: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Borc', borcSchema);
