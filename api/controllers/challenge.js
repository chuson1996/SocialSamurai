import mongoose from 'mongoose';
var Challenge = mongoose.model('Challenge');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

export function challengeRetrieveList(req, res) {
    Challenge
        .find({})
        .exec(function(err, challenges) {
            if (err) {
                sendJsonResponse(res, 400, err);
                return;
            }
            sendJsonResponse(res, 200, challenges);
    });
};

export function challengeRetrieveOne(req, res) {
    if (req. params && req.params.challengeId) {
        Challenge
            .findById(req.params.challengeId)
            .exec(function (err, challenge) {
                if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                } else if (!challenge) {
                    sendJsonResponse(res, 404, {
                        "message": "Challenge not found"
                    });
                    return;
                }
                sendJsonResponse(res, 200, challenge);
            })
    } else {
        sendJsonResponse(res, 404, {
            "message": "No challengeId in the request"
        });
    }
};

export function challengeCreate(req, res) {
    Challenge.create({
        title: req.body.title,
        description: req.body.description,
        link: req.body.link
    }, function(err, challenge) {
        if (err) {
            sendJsonResponse(res, 400, err);
            return;
        }
        sendJsonResponse(res, 201, challenge);
    });
};

export function challengeModify(req, res) {

};

export function challengeDestroy(req, res) {

};