const url = 'http://localhost:5000/books';

// Hämta och visa befintliga böcker vid sidladdning
fetch(url)
  .then(data => data.json())
  .then(books => { 
    renderBooks(books);
  })
  .catch(error => console.error("Fel vid hämtning av böcker:", error));

// Rendera böcker i listan
function renderBooks(books) {
  const ul = document.getElementById("book-list");

  ul.style.listStyleType = "none";

  books.forEach(book => {  
    const li = document.createElement("li");
    li.innerHTML = `
      <div> 
        <p>Författare: ${book.author}</p>
        <p>Title: ${book.title}</p>
        <p>ISBN: ${book.isbn}</p>
        <p>Genre: ${book.genre}</p>
        <button onclick="deleteBook(${book.id})">Ta bort</button>
      </div>`;
    li.style.backgroundColor = book.color || "#f5f5f5"; // Default bakgrundsfärg om ingen finns
    ul.appendChild(li); 
  });
}


document.getElementById("book-form").addEventListener("submit", function(event) {
    event.preventDefault();
   
  const formData = new FormData(form);
  const newBook = {
    author: formData.get("author"),
    title: formData.get("title"),
    isbn: formData.get("isbn"),
    genre: formData.get("genre"),
};


  // Skicka ny bok till servern
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP-fel! status: ${response.status}`);
      }
      return response.json();
    })
    .then(book => {
      addBookToList(book); // Lägg till boken i listan
    })
    .catch(error => console.error("Fel vid tillägg av bok:", error));
});

// Funktion för att lägga till en bok till listan
function addBookToList(book) {
  const ul = document.getElementById("book-list");
  const li = document.createElement("li");
  li.innerHTML = `
    <div> 
      <p>Författare: ${book.author}</p>
      <p>Title: ${book.title}</p>
      <p>ISBN: ${book.isbn}</p>
      <p>Genre: ${book.genre}</p>
    </div>`;
  li.style.backgroundColor = book.color || "#f5f5f5"; // Default bakgrundsfärg om ingen finns
  ul.appendChild(li);
}

// Hantera färg baserat på genre
const genreSelect = document.getElementById('genreSelect');
genreSelect.addEventListener('change', function() {
  const selectedGenre = genreSelect.value;

  if (selectedGenre) {
    fetch(`http://localhost:5000/genre-color/${selectedGenre}`)
      .then(response => response.json())
      .then(data => {
        if (data.color) {
          genreSelect.style.backgroundColor = data.color; // Ställ in bakgrundsfärg
        }
      })
      .catch(error => console.error("Fel vid hämtning av färg:", error));
  }
});

function deleteBook(id) {
  console.log("delete", id);
  fetch(`${url}/${id}`, { method: "DELETE" }).then(result => fetchData());
}