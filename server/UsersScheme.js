import mongoose from "mongoose";

const UsersScheme = new mongoose.Schema({
    login : {type : String, require : true},
    password : {type : String, require : true},
}, {collection : 'users'});

export const users = mongoose.model('users', UsersScheme);