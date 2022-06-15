import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username for this account.'],
    maxlength: [50, 'Name must be less than 50 characters'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password for this account.'],
  },
});

export default mongoose.models.User ||
  mongoose.model('User', UserSchema);
