import mongoose, { Schema } from 'mongoose';

const comment2ndSchema = mongoose.Schema({
    _creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    body: String,
    date: {
        type: Date,
        default: Date.now
    },
});

const commentSchema = mongoose.Schema({
    _creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    body: String,
    date: {
        type: Date,
        default: Date.now
    },
    comments: [comment2ndSchema]
});

const challengeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true,
        default: ""
    },
    level: {
        type: Number,
        required: true
    },
    comments: [commentSchema]
});

export default mongoose.model('Challenge', challengeSchema);
