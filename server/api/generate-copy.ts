require('dotenv').config(); // Load dotenv configuration

const openaiApiKey = process.env.OPENAI_API_KEY;



import { Request, Response } from 'express';
import OpenAI from 'openai';


if (!openaiApiKey) {
  throw new Error('The OPENAI_API_KEY environment variable is missing or empty');
}

// Create a `ClientOptions` object with the API key
const openai = new OpenAI({
  apiKey: openaiApiKey
});


const handler = async (req: Request, res: Response) => {
  try {
    console.log(req.headers, req.body); // Log incoming request for debugging

    const { tone } = req.body;
    let prompt = `Write a ${tone} piece of text for a social media post:`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
        max_tokens: 50,
        temperature: tone === 'friendly' ? 0.9 : 0.7,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`API call failed: ${responseData.error}`);
    }

    const generatedText = responseData.choices[0].text.trim();
    res.json({ copy: generatedText });
  } catch (error: unknown) {
    // Narrow down the type of 'error' to 'Error' before accessing 'message'
    if (error instanceof Error) {
      console.error('OpenAI API error:', error);
      res.status(500).json({ message: 'Error generating copy', error: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
  
};

module.exports = handler;
