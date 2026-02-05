const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const ObjectId = Schema.ObjectId;

// Schemas
const UserSchema = new Schema({
    email: String,
    password: String,
    name: String
});

const TodoSchema = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId
});


// Model
const UserModel = model('users', UserSchema);
const TodoModel = model('todos', TodoSchema);

module.exports = { UserModel, TodoModel };