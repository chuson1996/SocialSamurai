import mongoose from 'mongoose';
let User = mongoose.model('User');
let Challenge = mongoose.model('Challenge');

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

export function userRetrieveList(req, res) {
    User
        .find({})
        .exec((err, users) => {
            if (err) {
                sendJSONresponse(res, 400, err);
                return;
            }
            sendJSONresponse(res, 200, users);
            return;
        });
}

export function userRetrieveOne(req, res) {
    if (!req.params.userId) {
        sendJSONresponse(res, 404, {
            message: "No userId in the request"
        });
        return;
    }
    User
        .findById(req.params.userId)
        .select('-hash -salt')
        .exec((err, user) => {
            if (err) {
                sendJSONresponse(res, 400, err);
                return;
            }
            if (!user) {
                sendJSONresponse(res, 404, {
                    message: "User not found"
                });
                return;
            }
            sendJSONresponse(res, 200, user);
            return;
        })
}

export function userCreate(req, res) {
    sendJSONresponse(res, 404, {
        message: "Use endpoint /api/register instead"
    });
    return;
}

export function userModify(req, res) {
    if (!req.params.userId) {
        sendJSONresponse(res, 404, {
            messasge: "No userId in the request"
        });
    }
    User
        .findById(req.params.userId)
        .exec((err, user) => {
            if (req.body.name) {
                user.name = req.body.name;
            }
            if (req.body.level) {
                user.level = req.body.level;
            }
            if (req.body.avatarUrl) {
                user.avatarUrl = req.body.avatarUrl;
            }
            user.save((err, user) => {
                if (err) {
                    sendJSONresponse(res, 404, err);
                    return;
                }
                const token = user.generateJwt();
                res.cookie('token', token, { maxAge: 900000000 });
                sendJSONresponse(res, 200, token);
                return;
            });
        });
}

export function userDestroy(req, res) {
    if (!req.body.userId) {
        sendJSONresponse(res, 404, {
            message: "No userId in the request"
        });
        return;
    }
    User
        .findByIdAndRemove(req.params.userId)
        .exec((err, user) => {
            if (err) {
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 204, null);
            return;
        })
}
export function userLevelUp(req, res) {
    if (!req.body.userId) {
        sendJSONresponse(res, 404, {
            message: "No userId in the request"
        });
        return;
    }
    User
        .findById(req.body.userId)
        .exec((err, user) => {
            user.level = user.level + 1;
            user.save((err, user) => {
                if (err) {
                    sendJSONresponse(res, 404, err);
                    return;
                }
                const token = user.generateJwt();
                res.cookie('token', token, { maxAge: 900000000 });
                sendJSONresponse(res, 200, token);
                return;
            })
        });
}

