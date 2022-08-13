const mongoose = require('mongoose');

const Document = mongoose.model('Document', {
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },
    modifiedDate: {
        type: String,
        required: false
    },
    creationDate: {
        type: String,
        required: false
    }
});


module.exports = Document