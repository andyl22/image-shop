import mongoose, { Schema } from 'mongoose';

const Item = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this item'],
    maxlength: [75, 'Item name must be less than 75 characters'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this item.'],
    maxlength: [
      2000,
      'Item description must be less than 2000 characters',
    ],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price for this item.'],
    maxlength: [2000, 'Provide a price for this item.'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image link for this item.'],
    maxlength: [4000, 'Item link must be less than 4000 characters'],
  },
  visits: {
    type: Number,
    default: 0,
  },
  createDttm: {
    type: Date,
    default: Date.now(),
  },
  updateDttm: {
    type: Date,
    default: Date.now(),
  },
  sourceLink: {
    type: String,
    required: [true, 'Please provide a source for this item.'],
  },
  sourceName: {
    type: String,
    required: [true, 'Please provide the name of the item source.'],
  },
  subsection: {
    type: Schema.Types.ObjectId,
    required: [true, 'Must provide a subsection for this item'],
    ref: 'Subsection',
  },
});

export default mongoose.models.Item || mongoose.model('Item', Item);
