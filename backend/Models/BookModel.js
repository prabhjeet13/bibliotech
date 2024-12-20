const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    ISBN : {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required : true,
    }, 
    price: {
        type: Number,
        required: true,
    },    
    category: {
        type: String,
        required: true,
    },    
    description: {
        type: String,
        required: true,
    },    
    image: {
        type: String,
        required: true,
    },    
    title: {
        type: String,
        required: true,
    },
    quantity : {
        type : Number,
        required: true,
    }    
})

module.exports = mongoose.model("Book",bookSchema);