import mongoose from 'mongoose';

const StorageScheme = new mongoose.Schema({
    userLogin : {type: String, require: true},
    img : {type : String, require : true},
    name: { type: String, required: true },
    street: { type: String, required: true },
    about: { type: String, required: false },
    carCount: { type: Number, default: 0 },
    product: [
        {
            name: { type: String, required: false },
            about: {type: String, required: false },
            imgPath: {type: String, required: false },
            itemCount: { type: Number, required: false },
            itemW: { type: Number, required: false }
        }
    ],
    cars: [
        {
            carName: { type: String, required: true },
            carWeight: { type: Number, required: true },
        }
    ]
}, { collection: 'storage' });

export const storage = mongoose.model('storage', StorageScheme);