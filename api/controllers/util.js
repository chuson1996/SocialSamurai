import mongoose from 'mongoose';
let User = mongoose.model('User');

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

export function getUser(req, res, callback) {
    if (!req.payload._id) {
        sendJSONresponse(res, 404, {
            message: "User not found"
        });
        return;
    }
    User
        .findById(req.payload._id)
        .select('-hash -salt')
        .exec((err, user) => {
            if (!user) {
                sendJSONresponse(res, 404, {
                    message: "User not found"
                });
                return;
            }
            if (err) {
                sendJSONresponse(res, 404, err);
                return;
            }
            callback(req, res, user);
        });
};