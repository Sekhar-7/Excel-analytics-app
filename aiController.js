import OpenAI from 'openai';
import FileAnalysis from '../models/FileAnalysis.js'; // Your Mongoose model

// ❗ --- TEMPORARY FIX --- ❗
// Paste your actual OpenAI API key here between the quotes.
const apiKey = "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"; 

// This will now use the key directly from the line above.
const openai = new OpenAI({
    apiKey: apiKey,
});

export const summarizeData = async (req, res) => {
    const { fileId } = req.body;

    try {
        const fileData = await FileAnalysis.findById(fileId);
        if (!fileData || !fileData.jsonData) {
            return res.status(404).json({ message: 'Data not found.' });
        }

        const dataSample = JSON.stringify(fileData.jsonData.slice(0, 50));
        const prompt = `
            You are a helpful data analyst. Analyze the following sample JSON data from an Excel file.
            Provide a concise summary of key insights, identify any notable trends, or potential outliers.
            Present your analysis in clear, easy-to-read bullet points.

            Data Sample:
            ${dataSample}
        `;

        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
        });

        const summary = completion.choices[0].message.content;
        res.json({ summary });

    } catch (error) {
        console.error('AI summary generation failed:', error);
        res.status(500).json({ message: 'Failed to generate AI summary.' });
    }
};