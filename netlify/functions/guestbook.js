const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

const guestbookFilePath = path.join(__dirname, '../../guestbook.json');  // Pastikan jalur file benar

exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
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
      let currentData = [];
      
      // Cek apakah file JSON ada dan baca datanya jika ada
      if (fs.existsSync(guestbookFilePath)) {
        currentData = JSON.parse(fs.readFileSync(guestbookFilePath, 'utf-8'));
      }
      
      // Menambahkan entri baru ke array data
      currentData.push(newEntry);
      
      // Menyimpan data kembali ke file JSON
      fs.writeFileSync(guestbookFilePath, JSON.stringify(currentData, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Guestbook entry added successfully!" }),
      };
    } catch (error) {
      console.error('Error saving guestbook entry:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error saving guestbook entry", error }),
      };
    }
  } else if (event.httpMethod === "GET") {
    try {
      const data = fs.existsSync(guestbookFilePath)
        ? JSON.parse(fs.readFileSync(guestbookFilePath))
        : [];
      
      return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",  // Mengizinkan akses dari domain manapun
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error reading guestbook data", error }),
      };
    }
  }
};
