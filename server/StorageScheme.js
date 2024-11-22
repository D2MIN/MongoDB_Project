import mongoose from 'mongoose';

const StorageScheme = new mongoose.Schema({
    img : {type : String, require : true},
    name: { type: String, required: true },
    street: { type: String, required: true },
    about: { type: String, required: true },
    carCount: { type: Number, default: 0 },
    product: [
        {
            name: { type: String, required: false },
            about: {type: String, required: false },
            count: { type: Number, required: false }
        }
    ],
    cars: [
        {
            carName: { type: String, required: false },
            carWeight: { type: Number, required: false }
        }
    ]
}, { collection: 'storage' });

export const storage = mongoose.model('storage', StorageScheme);