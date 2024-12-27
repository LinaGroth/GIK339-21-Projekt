const express = require("express");
const server = express();
const sqlite3 = require("sqlite3").verbose();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

const db = new sqlite3.Database("./server/gik339-projekt.db", (err) => {
  if (err) {
    console.error("Kunde inte ansluta till databasen:", err.message);
  } else {
    console.log("Ansluten till SQLite-databasen.");
  }
});

// Hantera GET-förfrågan för att hämta användare
server.get("/books", (req, res) => {
  // Hämta alla användare från databasen
  db.all("SELECT * FROM books", (err, rows) => {
    if (err) {
      // Om ett fel inträffar skickar vi tillbaka ett 500-svar med felet
      res.status(500).send(err);
    } else {
      // Om det går bra skickar vi tillbaka resultaten (rows) som JSON
      res.send(rows);
    }
  });
});

server.listen(5000, () => {
  console.log("Servern körs på http://localhost:5000");
});
