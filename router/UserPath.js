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

router.put('updateUser/:username/:newUsername', async (req, res, next) => {
    const check = await schemas.usersModel.findOne({ username: newUsername });
    if (check) {
        res.status(409).send({});
    }
    else {
        try {
            const { username, newUsername } = req.params;
            return schemas.usersModel.findOneAndUpdate({ username: username }, { $set: { username: newUsername } }).then((user) => {
                return schemas.usersModel.findOne({ username: newUsername }).then((updatedUser) => {
                    return res.send(updatedUser), console.log("returned", updatedUser);
                })

            });
        } catch (exception) {
            return next({ message: exception.message });
        }
    }
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
})

module.exports = router;