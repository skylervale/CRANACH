let mongoose = require('mongoose')

let paintingSchema = new mongoose.Schema({
    langCode: String,
    involvedPersons: [
        {
            id: String,
            role: String,
            name: String,
            prefix: String,
            suffix:String,
            nameType: String,
            remarks:String,
            date:String,
            isUnknown:Boolean
        }
    ],


})