-- Ta bort tabellen om den redan finns
DROP TABLE IF EXISTS books;

-- Skapa tabellen books
CREATE TABLE books (
   id        INTEGER PRIMARY KEY AUTOINCREMENT,
   author    VARCHAR(50) NOT NULL, 
   title     VARCHAR(50) NOT NULL, 
   isbn      VARCHAR(16) NOT NULL, 
   genre     VARCHAR(30) NOT NULL,
   color     VARCHAR(7) --För grafiskt utseende
);

-- Lägg till data i tabellen, id behövs inte läggas till manuellt (pga autoincrement)
INSERT INTO books (author, title, isbn, genre, color) VALUES 
('Diana Gabaldon', 'Främlingen', '9789175470917', 'Romantik', '#FFC0CB'),
('Suzanne Collins', 'Hungerspelen', '9780439023528', 'Dystopi', '#808080'),
('Colleen Hoover', 'Verity', '9789180636681', 'Thriller', '#FF4500'),
('JK Rowling', 'Harry Potter och den flammande bägaren', '9789129723915', 'Fantasy', '#FFD700'),
('Stephen King', 'Doktor Sömn', '9781476727653', 'Thriller', '#FF4500'),
('Yuval Noah Harari', 'Sapiens: en kort historik över mänskligheten', '9789127161450', 'Historia', '#4682B4'),
('Michelle Obama', 'Min historia', '9789137153049', 'Självbiografi', '#000000'),
('Conny Palmqvist', 'Sundets röda nejlikor', '9789137501598', 'Historia', '#4682B4');