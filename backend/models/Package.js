// backend/models/Package.js
import mongoose from 'mongoose';

const priceRangeSchema = new mongoose.Schema({
  from: { type: Number, required: true },
  to:   { type: Number, required: true },
  price:{ type: Number, required: true },
});

const itinerarySchema = new mongoose.Schema({
  id:         { type: Number, required: true },
  title:      { type: String, required: true },
  activities: [{ type: String }],
});

const inclusionSchema = new mongoose.Schema({
  id:      { type: Number, required: true },
  title:   { type: String, required: true },
  details: [{ type: String }],
});

const highlightSchema = new mongoose.Schema({
  id:    { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
});

const staySchema = new mongoose.Schema({
  id:          { type: Number, required: true },
  hotel:       { type: String, required: true },
  roomType:    { type: String, required: true },
  amenities:   [{ type: String }],
  images:      [{ type: String }],
  description: { type: String },
});

const packageSchema = new mongoose.Schema({
  status:         { type: String, enum: ['active', 'inactive'], default: 'active' },
  bookings:       { type: Number, default: 0 },
  rating:         { type: Number, default: 0 },
  name:           { type: String, required: true },
  description:    { type: String, required: true },
  location:       { type: String, required: true },
  priceType:      { type: String, enum: ['fixed','variable'], default: 'variable' },
  priceRanges:    [priceRangeSchema],
  dateType:       { type: String, enum: ['range','separate'], default: 'range' },
  availableDates: {
    start: { type: Date },
    end:   { type: Date }
  },
  specificDates: [{ type: Date }],
  quantity:       { type: Number },
  mainPhotos:     [{ type: String }],
  itinerary:      [itinerarySchema],
  inclusions:     [inclusionSchema],
  highlights:     [highlightSchema],
  stays:          [staySchema],
  createdBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true
});

export default mongoose.model('Package', packageSchema);
