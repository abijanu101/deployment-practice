const mongoose = require('mongoose');

const listItemSchema = mongoose.Schema({
    'text': {
        type: String,
        required: true
    }
});

const ListItem = mongoose.model('ListItem', listItemSchema);

module.exports = ListItem;