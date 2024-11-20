
const fetch = require('node-fetch');  // Pastikan Anda sudah menginstal 'node-fetch' di projek Anda

exports.handler = async (event, context) => {
  const apiUrl = `https://api.netlify.com/api/v1/sites/${process.env.NETLIFY_SITE_ID}/form_submissions`;

  const headers = {
    'Authorization': `Bearer ${process.env.NETLIFY_API_TOKEN}`,  // Pastikan Anda mengatur token API di Netlify
  };

  try {
    const response = await fetch(apiUrl, { headers });
    if (!response.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch form submissions' })
      };
    }
    const submissions = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(submissions),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching submissions' }),
    };
  }
};
