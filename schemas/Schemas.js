let mongoose = require('mongoose');

exports.usersSchema = new mongoose.Schema({
    username: String,
    fname: String,
    lname: String,
    age: Number,
    workouts:[
        {
            workoutName: String,
            date: Date
            // exercises: [{
            //     exercise: Exercise,
            // }]
        }
    ]
});

exports.exerciseSchema = new mongoose.Schema({
    exerciseName: String
});

exports.usersModel = mongoose.model(
    'users',
    this.usersSchema
);

exports.exerciseModel = mongoose.model(
    'exercises',
    this.exerciseSchema
);