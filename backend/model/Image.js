const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    image:{
        type:String
    },
    count:{
        type:Number
    }
    
});
const Image = new mongoose.model('Image',ImageSchema);
module.exports = Image;