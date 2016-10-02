import mongoose from 'mongoose';
const challengeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});
export default mongoose.model('Challenge', challengeSchema);