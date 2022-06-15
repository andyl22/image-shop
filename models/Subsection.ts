import mongoose, { Schema } from 'mongoose';

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
  section: {
    type: Schema.Types.ObjectId,
    ref: 'Section',
  },
});

export default mongoose.models.Subsection ||
  mongoose.model('Subsection', Subsection);
