import mongoose from 'mongoose';
const UserScheme = new mongoose.Schema({
    name : String,
    lastName : String,
    age : Number,
});

export const Users = mongoose.model('Users',UserScheme);