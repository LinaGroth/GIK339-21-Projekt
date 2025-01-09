DROP TABLE IF EXISTS books;


CREATE TABLE books (
   id        INTEGER PRIMARY KEY AUTOINCREMENT,
   author    VARCHAR(50) NOT NULL, 
   title     VARCHAR(50) NOT NULL, 
   isbn      INTEGER(16) NOT NULL, 
   genre     VARCHAR(30) NOT NULL,
   color     VARCHAR(7) 
);


INSERT INTO books (author, title, isbn, genre, color) VALUES 
('Diana Gabaldon', 'Främlingen', '9789175470917', 'Romantik', '#AA4465'),
('Suzanne Collins', 'Hungerspelen', '9780439023528', 'Dystopi', '#7B747D'),
('Colleen Hoover', 'Verity', '9789180636681', 'Thriller', '#303633'),
('JK Rowling', 'Harry Potter och den flammande bägaren', '9789129723915', 'Fantasy', '#7EB09B'),
('Stephen King', 'Doktor Sömn', '9781476727653', 'Thriller', '#303633'),
('Yuval Noah Harari', 'Sapiens: en kort historik över mänskligheten', '9789127161450', 'Historia', '#9395D3'),
('Michelle Obama', 'Min historia', '9789137153049', 'Självbiografi', '#F0B67F'),
('Conny Palmqvist', 'Sundets röda nejlikor', '9789137501598', 'Historia', '#9395D3');