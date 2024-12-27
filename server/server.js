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

server.get('/books', (req, res) => {
    res.json(books);
})
