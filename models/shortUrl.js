const mongoose=require('mongoose')
const shortId=require('shortid')

mongoose.connect("mongodb://127.0.0.1:27017/UrlShortener2");

const shortUrlSchema=new mongoose.Schema({
    full:{
        type: String,
        required: true
    },
    short:{
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks:{
        type:Number,
        required:true,
        default:0
    }
})

module.exports= mongoose.model('ShortUrl',shortUrlSchema)