import { Request, Response } from 'express';

const axios = require('axios');

module.exports = async (req: Request, res: Response) => {
  try {
    const { tone } = req.body;
    const prompt = `Write a ${tone} piece of text for a social media post:`;

    // Use the "gpt-3.5-turbo" model for OpenAI's Chat API
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: "You are a helpful assistant."
      },{
        role: "user",
        content: prompt
      }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    // Assume the last message in the response is the completion
    const messages = response.data.data.messages;
    const lastMessage = messages[messages.length - 1];
    
    res.json({ copy: lastMessage.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ message: 'Error generating copy' });
  }
};
