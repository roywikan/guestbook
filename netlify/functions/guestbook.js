export async function handler(event, context) {
  try {
    // Ambil parameter query dari URL
    const { action } = event.queryStringParameters || {};

    if (action === 'fetchApiExample') {
      // Logika untuk API Contoh
      const response = await fetch('https://api.example.com');
      const data = await response.json();

      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } else if (action === 'netlifyApi') {
      // Logika untuk Netlify API
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
    } else {
      // Jika tidak ada `action` yang valid
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Invalid action parameter. Use ?action=fetchApiExample or ?action=netlifyApi',
        }),
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
