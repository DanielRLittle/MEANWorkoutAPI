let mongoose = require('mongoose');

exports.usersSchema = new mongoose.Schema({
    username: String,
    fname: String,
    lname: String,
    age: Number,
    workouts:[
        {
            workoutNumber: {
                type: Number,
                unique: true
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
    exercises: [
        {
            exerciseNumber: {
                type: Number,
                unique: true
            }
        }
    ]
});

exports.exerciseSchema = new mongoose.Schema({
    exerciseNumber: {
        type: Number,
        unique: true,
        required: true
    },
    exerciseName: {
        type: String,
        unique: true
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