const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');
const path = require('path');

const server = express();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

  const PORT = 5000;
  server.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
  });
  

// Skapa databasinstans
  const db = new sqlite3.Database("./gik339-projekt.db", (err) => {
    if (err) {
      console.error("Kunde inte ansluta till databasen:", err.message);
    } else {
      console.log("Ansluten till SQLite-databasen.");
    }
  });

  // Läs SQL-filen och kör kommandona
const sqlFile = path.join(__dirname, 'books.sql'); // Hitta rätt väg till books.sql
const sql = fs.readFileSync(sqlFile, 'utf8'); // Läs innehållet från SQL-filen

// Kör SQL-kommandona för att skapa och fylla databasen
db.exec(sql, (err) => {
  if (err) {
    console.error("Kunde inte köra SQL-kommandon:", err.message);
  } else {
    console.log("Databasen skapad och ifylld med data.");
  }
});

  
  server.get("/books", (req, res) => {
    const query = "SELECT * FROM books";

    db.all(query, [], (err, rows) => {
      if (err) {
        console.error("Fel vid databasfråga:", err.message);
        res.status(500).send("Ett fel uppstod vid hämtning av data.");
      } else {
        console.log("Data hämtad:", rows);
        res.json(rows);
      }
    });

    });
