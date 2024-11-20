const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

// Tentukan path ke file JSON yang akan menyimpan data guestbook
const guestbookFilePath = path.join(__dirname, '../../guestbook.json');  // Periksa jalur file dengan benar

exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    // Menunggu data formulir dari body request
    const formData = await new Promise((resolve, reject) => {
      let data = "";
      event.body.on('data', chunk => data += chunk);
      event.body.on('end', () => resolve(data));
      event.body.on('error', err => reject(err));
    });

    // Parsing data dari form
    const formFields = parse(formData);
    const newEntry = {
      name: formFields.name,
      message: formFields.message,
      date: new Date().toISOString(),
    };

    console.log("Data formulir yang diterima:", newEntry);  // Konfirmasi data yang diterima dari formulir

    try {
      let currentData = [];
      
      // Deteksi apakah file guestbook.json sudah ada
      if (fs.existsSync(guestbookFilePath)) {
        console.log("File guestbook.json ditemukan, membaca data...");
        currentData = JSON.parse(fs.readFileSync(guestbookFilePath, 'utf-8'));
      } else {
        console.log("File guestbook.json tidak ditemukan, membuat file baru...");
      }

      // Menambahkan data baru ke dalam array data
      currentData.push(newEntry);

      // Menyimpan data ke dalam file guestbook.json
      fs.writeFileSync(guestbookFilePath, JSON.stringify(currentData, null, 2));

      console.log("Data berhasil disimpan ke guestbook.json");

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
      // Membaca data dari guestbook.json jika ada
      const data = fs.existsSync(guestbookFilePath)
        ? JSON.parse(fs.readFileSync(guestbookFilePath))
        : [];

      console.log("Data berhasil ditarik dari guestbook.json:", data);

      return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",  // Mengizinkan akses dari domain manapun
        },
      };
    } catch (error) {
      console.error('Error reading guestbook data:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error reading guestbook data", error }),
      };
    }
  }
};
