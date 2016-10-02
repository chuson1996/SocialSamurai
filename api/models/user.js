import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});
export default mongoose.model('User', userSchema);