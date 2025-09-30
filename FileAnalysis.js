import mongoose from 'mongoose';

const fileAnalysisSchema = new mongoose.Schema({
  // Reference to the user who uploaded the file
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // This creates a reference to your User model
  },
  
  // The original name of the uploaded Excel file
  fileName: {
    type: String,
    required: true,
  },

  // An array of strings containing the column headers from the Excel sheet
  headers: {
    type: [String],
    required: true,
  },

  // The main data, parsed into an array of JSON objects (rows)
  jsonData: {
    type: [Object],
    required: true,
  },

  // The date and time when the file was uploaded
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const FileAnalysis = mongoose.model('FileAnalysis', fileAnalysisSchema);

export default FileAnalysis;