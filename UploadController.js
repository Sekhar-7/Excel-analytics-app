import exceljs from 'exceljs';
import { v4 as uuidv4 } from 'uuid';

// Export this so other files (like aiController) can access it
export const temporaryStorage = {};

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.load(req.file.buffer);

    const worksheet = workbook.worksheets[0];
    const jsonData = [];
    const headers = [];

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) {
        // Get headers from the first row and convert them to strings
        row.values.forEach(header => headers.push(String(header)));
      } else {
        // Get data from subsequent rows
        const rowObject = {};
        row.values.forEach((value, index) => {
          const header = headers[index - 1]; // (index is 1-based)
          if (header) {
            rowObject[header] = value;
          }
        });
        jsonData.push(rowObject);
      }
    });

    if (jsonData.length === 0) {
      return res.status(400).json({ message: 'Excel file is empty.' });
    }

    // Generate a unique ID for this upload
    const fileId = uuidv4();

    // Store the data in our temporary storage
    temporaryStorage[fileId] = jsonData;

    // Send the response back with the ID
    res.status(201).json({
      message: 'File processed successfully (temporary)',
      data: jsonData,
      fileId: fileId,
    });

  } catch (error) {
    console.error('File upload processing error:', error);
    res.status(500).json({ message: 'Server error during file processing.' });
  }
};