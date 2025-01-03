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

  
server.get('/books', (req, res) => {
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

server.post('/books', (req, res) => {
  const book = req.body;
  console.log('Ny bok:', book); // Logga de inkommande data för felsökning
  const sql = `INSERT INTO books(author, title, isbn, genre) VALUES (?, ?, ?, ?)`;

  db.run(sql, [book.author, book.title, book.isbn, book.genre], function(err) {
    if (err) {
      console.error("Kunde inte lägga till bok:", err.message);
      res.status(500).json({ error: "Kunde inte lägga till bok" }); // Skicka JSON vid fel
    } else {
      res.json({ id: this.lastID, ...book }); // Skicka tillbaka boken med ID som JSON
    }
  });
});
server.put('/books', (req, res) => {
  const bodyData = req.body;

  const id = bodyData.id;
  const book = {
    author: bodyData.author,
    title: bodyData.title,
    isbn: bodyData.isbn,
    genre: bodyData.genre
  };

  let updateString = '';
  const columnArray = Object.keys(book);
    columnArray.forEach((column, i) => {
      updateString += `${column}="${book[column]}"`;
      if (i !== columnArray.length - 1) updateString += ',';
    });

  const sql = `UPDATE books SET ${updateString} WHERE id=${id}`;
      
  db.run(sql, Object.values(book), (err) =>{
    if (err){
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Boken uppdaterades");
    }
  });
});

server.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM books WHERE id = ${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send('Bok borttagen.');
  }});
});
server.get('/genre-color/:genre', (req, res) => {
  const genreColors = {
    Romantik: '#AA4465',
    Dystopi: '#7B747D',
    Thriller: '#303633',
    Fantasy: '#7EB09B',
    Biografi: '#F0B67F',
    Historia: '#9395D3',
    Annat: '#969696',
    
  };

  const genre = req.params.genre;
  const color = genreColors[genre];

  if (color) {
    res.json({ color });
  } else {
    res.status(404).json({ message: 'Genre color not found' });
  }
});
