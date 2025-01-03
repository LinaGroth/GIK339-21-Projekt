const url = 'http://localhost:5000/books';

fetch(url)
  .then(data => data.json()) 
  .then(books => { 
    const ul = document.getElementById("book-list"); // Hitta den existerande ul

    ul.style.listStyleType = "none"; 

    books.forEach(book => {  
      const li = document.createElement("li");

      li.innerHTML = `
      <div> 
       <p>Författare: ${book.author}</p>
       <p>Title:  ${book.title}</p>
       <p>ISBN: ${book.isbn}</p>
       <p>Genre: ${book.genre}</p>
      </div>`;

      li.style.backgroundColor = book.color; 
      ul.appendChild(li); 
    });

    document.getElementById("book-list-container").appendChild(ul); 
  })

  // Hämta referens till genreSelect och färgfältet
const genreSelect = document.getElementById('genreSelect');
const colorInput = document.querySelector('input[placeholder="Ange färg"]'); // Välj rätt input-fält

// Lyssna på förändringar i genreSelect
genreSelect.addEventListener('change', function() {
  const selectedGenre = genreSelect.value;

  if (selectedGenre) {
    fetch(`http://localhost:5000/genre-color/${selectedGenre}`)
      .then(response => response.json())
      .then(data => {
        if (data.color) {
          colorInput.value = data.color; // Sätt färgen i färgfältet
        }
      })
      .catch(error => console.error("Fel vid hämtning av färg:", error));
  }
});