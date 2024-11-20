//memicu netlify/functions/guestbook.js

const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

const guestbookFilePath = path.join(__dirname, '../../guestbook.json');

// Fungsi untuk menangani GET dan POST
exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    // Menangani pengiriman formulir
    const formData = await new Promise((resolve, reject) => {
      let data = "";
      event.body.on('data', chunk => data += chunk);
      event.body.on('end', () => resolve(data));
      event.body.on('error', err => reject(err));
    });

    const formFields = parse(formData);
    const newEntry = {
      name: formFields.name,
      message: formFields.message,
      date: new Date().toISOString(),
    };

    try {
      const currentData = fs.existsSync(guestbookFilePath)
        ? JSON.parse(fs.readFileSync(guestbookFilePath))
        : [];
      
      currentData.push(newEntry);
      fs.writeFileSync(guestbookFilePath, JSON.stringify(currentData, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Guestbook entry added successfully!" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error saving guestbook entry", error }),
      };
    }
  } else if (event.httpMethod === "GET") {
    // Menangani permintaan GET untuk menampilkan data
    try {
      const data = fs.existsSync(guestbookFilePath)
        ? JSON.parse(fs.readFileSync(guestbookFilePath))
        : [];
      
      return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",  // CORS agar bisa diakses dari GitHub Pages
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error reading guestbook data", error }),
      };
    }
  } else {
    return {
      statusCode: 405,  // Method Not Allowed
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }
};
