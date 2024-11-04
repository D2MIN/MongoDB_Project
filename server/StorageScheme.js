import mongoose from 'mongoose';

const StorageScheme = new mongoose.Schema({
    name: { type: String, required: true },
    street: { type: String, required: true },
    about: { type: String, required: true },
    carCount: { type: Number, default: 0 },
    product: [
        {
            name: { type: String, required: true },
            about: String,
            count: { type: Number, default: 0 }
        }
    ],
    cars: [
        {
            carName: { type: String, required: true },
            carWeight: { type: Number, default: 0 }
        }
    ]
}, { collection: 'storage' });

export const storage = mongoose.model('storage', StorageScheme);