-- Ta bort tabellen om den redan finns
DROP TABLE IF EXISTS books;

-- Skapa tabellen books
CREATE TABLE books (
   id        INTEGER  NOT NULL PRIMARY KEY,
   author    VARCHAR(50) NOT NULL, 
   title     VARCHAR(50) NOT NULL, 
   isbn      VARCHAR(16) NOT NULL, 
   genre     VARCHAR(30) NOT NULL
);

-- Lägg till data i tabellen
INSERT INTO books (id, author, title, isbn, genre) VALUES 
(1, 'Diana Gabaldon', 'Främlingen', '9789175470917', 'Romantik'),
(2, 'Suzanne Collins', 'Hungerspelen', '9780439023528', 'Dystopi'),
(3, 'Colleen Hoover', 'Verity', '9789180636681', 'Deckare/Thriller'),
(4, 'JK Rowling', 'Harry Potter och den flammande bägaren', '9789129723915', 'Fantasy'),
(5, 'Stephen King', 'Doktor Sömn', '9781476727653', 'Skräck/Thriller'),
(6, 'Yuval Noah Harari', 'Sapiens: en kort historik över mänskligheten', '9789127161450', 'Historia'),
(7, 'Michelle Obama', 'Min historia', '9789137153049', 'Självbiografi'),
(8, 'Conny Palmqvist', 'Sundets röda nejlikor', '9789137501598', 'Historia');