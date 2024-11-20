import fetch from 'node-fetch';

export async function handler(event, context) {
  try {
    const { SITE_ID_NYA, FORM_ID, API_TOKEN } = process.env;

    if (!SITE_ID_NYA || !FORM_ID || !API_TOKEN) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Missing environment variables.',
        }),
      };
    }

    const apiURL = `https://api.netlify.com/api/v1/sites/${SITE_ID_NYA}/forms/${FORM_ID}/submissions`;

    const response = await fetch(apiURL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Netlify API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
