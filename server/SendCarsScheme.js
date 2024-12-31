import mongoose from "mongoose";

const SendCarScheme = new mongoose.Schema({
    carName: {type : String, require : true},
    carID : {type: String, require: true},
    carItem: [
        {
            name: { type: String, required: true },
            about: {type: String, required: false },
            imgPath: {type: String, required: false },
            itemCount: { type: Number, required: true },
            itemW: { type: Number, required: true }
        }
    ],
    carDate: {type : Number, require: true},
    carMonth: {type : Number, require: true},
    carYear: {type : Number, require: true},
    onStorage: {type: String, require: true},
    toStorage: {type: String, require: true}
}, {collection : 'sendCars'});

export const sendCars = mongoose.model('sendCars', SendCarScheme);