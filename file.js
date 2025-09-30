import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { 
  timestamps: true // This automatically adds createdAt and updatedAt fields
}); 

export default mongoose.models.File || mongoose.model('File', fileSchema);