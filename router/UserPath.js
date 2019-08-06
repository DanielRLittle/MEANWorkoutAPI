var express = require('express');
var router = express.Router();
var schemas = require('../schemas/Schemas');
var paramHandler = require('../handlers/param-handlers');
var utils = require('../utils');
const lodash = require('lodash');

router.get('/all', (req, res) => {
    return schemas.usersModel.find().then((doc) => {
        return res.send(doc);
    });
});

router.get('/getUsername', (req, res) => {
    const { username } = req.query;
    return schemas.usersModel.findOne({ username }).then(doc => {
        console.log(doc);
        res.send(doc);
    },
        error => res.sendStatus(400)
    );
});

router.post('/create', async (req, res, next) => {
    const newUser = new schemas.usersModel(req.body);
    const check = await schemas.usersModel.findOne({ username: newUser.username });
    if (check) {
        res.status(409).send({});
    }
    else {
        console.log(req.body)
        return newUser.save().then(
            doc => res.status(201).send(doc),
            error => next(error)
        );
    }
});

router.put('/updateUser/:username/:newUsername', async (request, response, next) => {
    schemas.usersModel.findOneAndUpdate({ 'username': request.params.username }, { 'username': request.params.newUsername }).then(() => {
        response.status(200).send("it might work");
    }).catch((x) => {
        response.status(409).send(x);
    }).catch(next);
});

router.put('/updateUser/:username', async (request, response, next) => {
    schemas.usersModel.updateOne({ 'username': request.params.username }, request.body).then(() => {
        response.status(200).send("it works!");
    }).catch((x) => {
        response.status(409).send(x);
    }).catch(next);
});

router.delete('/delete', (req, res, next) => {
    paramHandler(req, res, ['id'], async () => {
        try {
            const id = utils.toObjectId(req.query.id);
            try {
                await schemas.usersModel.findByIdAndDelete(id);
                res.status(204).send();
            }
            catch (exc) {
                next(exc);
            }
        }
        catch (exc) {
            next({ message: exc.message });
            return;
        }
    });
});

// router.post('/createWorkout/:username', async (request, response, next) => {
//     schemas.usersModel.findOne({'username': request.params.username});
//     const newWorkout = new schemas.workoutsModel(request.body).then(() => {
//         return newWorkout.save().then((x) => {
//         router.put('/createWorkout/:username', async (req, res, nex) => {
//             schemas.usersModel.updateOne({ 'username': req.params.username}, {$set: {workouts: workouts + x.workoutNumber}}).then(
//                 doc => res.status(201).send(doc),
//                 error => next(error)
//             );
//             });
//         });
//     });
// });

router.post('/createWorkout', async (request, response, next) => {
    const newWorkout = new schemas.workoutsModel(request.body);
    return newWorkout.save().then(
        doc => response.status(201).send(doc),
        error => next(error));
});

router.get('/workout/:workoutNumber', (request, response) => {
    return schemas.workoutsModel.findOne({'workoutNumber': request.params.workoutNumber}).then((x) => {
        console.log(x);
        response.send(x);
    }
    );
});

router.put('/updateWorkout/:username', async (request, response, next) => {
    schemas.usersModel.updateOne({ 'username': request.params.username }, request.body).then(() => {
        response.status(200).send("it may work");
    }).catch((x) => {
        response.status(409).send(x);
    }).catch(next);
});

module.exports = router;