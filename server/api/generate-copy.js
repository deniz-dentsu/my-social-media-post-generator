import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
// Load environment variables
require('dotenv').config();
const app = express();
// CORS Configuration for Development
app.use(cors({
    origin: '*', // Allows all origins (you should restrict this in production)
}));
app.use(express.json());
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    console.error('No API key found in environment variables');
    process.exit(1);
}
// Initialize OpenAI client
const openai = new OpenAI({ apiKey });
// Route handler for generating copy
const generateCopyHandler = async (req, res) => {
    try {
        const { topic } = req.body;
        if (!topic) {
            return res.status(400).json({ message: 'Topic is required' });
        }
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `Please generate 3 creative captions about ${topic}.` }
            ],
            max_tokens: 150,
            n: 3,
        });
        const generatedTexts = completion.choices.map(choice => { var _a; return (_a = choice.message) === null || _a === void 0 ? void 0 : _a.content; }).filter((content) => content != null);
        res.json({ copy: generatedTexts });
    }
    catch (error) {
        console.error('Error generating copy:', error);
        res.status(500).json({ message: 'Error generating copy', error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
// Define the POST route for /api/generate-copy
app.post('/api/generate-copy', generateCopyHandler);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
