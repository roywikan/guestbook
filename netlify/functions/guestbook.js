// netlify/functions/guestbook.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  // Mendapatkan data dari form
  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    const { name, message } = body;

    // Lokasi file JSON
    const filePath = path.join(__dirname, 'guestbook.json');
    
    try {
      // Membaca file JSON yang sudah ada
      let data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
      const newEntry = { name, message, date: new Date() };

      // Menambahkan entry baru
      data.push(newEntry);

      // Menyimpan kembali data ke file JSON
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Success!" })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error saving guestbook entry' })
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method Not Allowed' })
  };
};
