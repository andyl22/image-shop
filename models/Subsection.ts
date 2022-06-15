import mongoose from 'mongoose';

const Subsection = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the subsection.'],
    maxlength: [
      50,
      'Subsection name must be less than 50 characters',
    ],
    unique: true,
  },
});

export default mongoose.models.Subsection ||
  mongoose.model('Subsection', Subsection);
