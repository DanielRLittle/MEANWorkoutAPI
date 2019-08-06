let mongoose = require('mongoose');

exports.usersSchema = new mongoose.Schema({
    username: String,
    fname: String,
    lname: String,
    age: Number,
    workouts:[
        {
            workoutNumber: {
                type: Number
            }
        }
    ]
});

exports.workoutsSchema = new mongoose.Schema({
    workoutNumber: {
        type: Number,
        unique: true,
        required: true
    },
    workoutName: String,
    workoutDate: Date,
    exercises: [{
        exerciseNumber: {
            type: Number
        }
    }]
});

exports.exerciseSchema = new mongoose.Schema({
    exerciseNumber: {
        type: Number,
        unique: true,
        required: true
    },
    exerciseName: {
        type: String,
        unique: true,
        required: true
    }
});

exports.usersModel = mongoose.model(
    'users',
    this.usersSchema
);

exports.workoutsModel = mongoose.model(
    'workouts',
    this.workoutsSchema
);

exports.exerciseModel = mongoose.model(
    'exercises',
    this.exerciseSchema
);