export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Generating image with prompt:', prompt);

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        size: "1024x1024",
        quality: "standard",
        n: 1
      })
    });

    const responseText = await response.text();
    console.log('OpenAI response status:', response.status);
    console.log('OpenAI response text:', responseText);

    if (!response.ok) {
      let errorMessage = `OpenAI API error: ${response.status}`;
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error?.message || errorMessage;
      } catch (e) {
        errorMessage = responseText || errorMessage;
      }
      return res.status(response.status).json({ error: errorMessage });
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse OpenAI response as JSON:', e);
      return res.status(500).json({ error: 'Invalid response from OpenAI API' });
    }

    if (!data.data || !data.data[0] || !data.data[0].url) {
      return res.status(500).json({ error: 'No image URL in OpenAI response' });
    }

    res.status(200).json(data);

  } catch (error) {
    console.error('Error in generate-image API:', error);
    res.status(500).json({ 
      error: `Server error: ${error.message}`,
      details: error.stack
    });
  }
}
