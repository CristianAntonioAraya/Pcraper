const { Schema , model } = require('mongoose');

const productSchema = Schema({
    Brand: {
        type: String,
        require: true,
        trim: true,
    },
    Name: {
        type: String,
        require: true,
    },
    Price: {
        type: String,
        require: true
    },
    Img: {
        type: String,
        require: true
    },
    Link: {
        type: String,
        require: true
    },
    Page: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

module.exports = model('Product', productSchema)