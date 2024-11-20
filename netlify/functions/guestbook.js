const fetch = require('node-fetch'); // Netlify supports node-fetch

exports.handler = async function (event, context) {
  const SITE_ID = process.env.SITE_ID_NYA;
  const FORM_ID = process.env.FORM_ID;
  const API_TOKEN = process.env.API_TOKEN;

  const apiURL = `https://api.netlify.com/api/v1/sites/${SITE_ID}/forms/${FORM_ID}/guestbook`;

  try {
    const response = await fetch(apiURL, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch submissions' }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
    };
  }
};
