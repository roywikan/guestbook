// netlify/functions/guestbook.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const filePath = path.join(__dirname, 'guestbook.json');

  // Jika metode HTTP adalah POST, simpan data
  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    const { name, message } = body;

    try {
      let data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
      const newEntry = { name, message, date: new Date() };
      data.push(newEntry);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Guestbook entry saved successfully!" })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error saving guestbook entry' })
      };
    }
  }

  // Jika metode HTTP adalah GET, ambil data
  if (event.httpMethod === "GET") {
    try {
      const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error reading guestbook data' })
      };
    }
  }

  // Jika metode HTTP selain GET atau POST
  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method Not Allowed' })
  };
};
