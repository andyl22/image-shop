import mongoose from 'mongoose';

const Section = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Please provide a name for the section'],
    maxlength: [50, 'section name must be less than 50 characters'],
  },
});

export default mongoose.models.Section ||
  mongoose.model('Section', Section);
