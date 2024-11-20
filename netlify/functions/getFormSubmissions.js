const fetch = require('node-fetch');  // Ensure 'node-fetch' is installed or use built-in fetch API

exports.handler = async (event, context) => {
  const siteId = '59fee68f-147e-432f-9c3f-d871ffb4ba9f'; // Netlify Site ID
  const formId = '673d007e95d88a0008661480'; // Form ID
  const apiUrl = `https://api.netlify.com/api/v1/sites/${siteId}/forms/${formId}/submissions`;
  
  const headers = {
    'Authorization': `Bearer ${process.env.NETLIFY_API_TOKEN}`,  // Use environment variable for the token
  };

  try {
    const response = await fetch(apiUrl, { headers });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch submissions' }),
    };
  }
};
