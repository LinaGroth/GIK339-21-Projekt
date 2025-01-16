const url = 'http://localhost:5000/books';

window.addEventListener('load', fetchData);
const bookForm = document.querySelector("#bookForm");

// Hämta och visa befintliga böcker vid sidladdning
function fetchData() {
  fetch(url)
    .then((data) => data.json())
    .then((books) => { 
      if (books.length > 0) {
        let html = `<ul class="list-group bookListContainer">`

        books.forEach(book => {  
          const backgroundColor = book.color || "#f55555";
          html += `
            <li class="mt-5 listItem" style="background-color: ${backgroundColor};"> 
              <p>Författare: ${book.author}</p>
              <p>Title: ${book.title}</p>
              <p>ISBN: ${book.isbn}</p>
              <p>Genre: ${book.genre}</p>
              <div id="buttons">
                <button class="btnStyling" onclick="deleteBook(${book.id})" data-bs-toggle="modal" data-bs-target="#feedbackModal" data-message="Bok borttagen!">Ta bort</button>
                <button class="btnStyling" onclick="changeBook(${book.id})">Ändra</button>
              </div>
            </li>`;
        });
      html += `</ul>`
      const booksContainer = document.getElementById('booksContainer');
      booksContainer.innerHTML = html;
    }
  })
      .catch(error => console.error("Fel vid hämtning av böcker:", error));
}

function changeBook(id) {
  
  console.log("change", id);
  fetch(`${url}/${id}`)
  .then((result) => result.json())
  .then((book) => {
    console.log(book);
    bookForm.author.value = book.author;
    bookForm.title.value = book.title;
    bookForm.isbn.value = book.isbn;
    bookForm.genre.value = book.genre;
    
    
    localStorage.setItem('currentId', book.id);
  });
}


function deleteBook(id) {
  console.log("delete", id);
  fetch(`${url}/${id}`, { method: "DELETE" })
  .then((response) => {
    if (response.ok) {
      showFeedback('Boken har tagits bort!');
      fetchData(); // Uppdatera boklistan
    } else {
      throw new Error('Kunde inte ta bort boken.');
    }
  })
  .catch((error) => console.error('Fel vid borttagning:', error));
}



bookForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  
  const bookObject = {
    author: '', 
    title: '',
    isbn: '',
    genre: ''
  };
  bookObject.author = bookForm.author.value;
  bookObject.title = bookForm.title.value;
  bookObject.isbn = bookForm.isbn.value;
  bookObject.genre = bookForm.genre.value;

  const id = localStorage.getItem('currentId');
  if(id) {
    bookObject.id = id;
  } 

  const request = new Request(url,  {
    method: bookObject.id ? 'PUT': 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(bookObject)
  });
  fetch(request)
    .then((response) => {
      if (response.ok) {
        const action = bookObject.id ? 'uppdaterats' : 'lagts till';
        showFeedback(`Boken "${bookObject.title}" har ${action}.`);
        fetchData();
        bookForm.reset();
        localStorage.removeItem('currentId');
      } else {
        throw new Error('Kunde inte spara boken.');
      }
    })

  .catch((error) => console.error('Fel vid skapande/uppdatering:', error));
}

function showFeedback(message) {
  const feedbackModal = new bootstrap.Modal(document.getElementById('feedbackModal'));
  const modalBody = document.getElementById('inputModal');
  modalBody.innerHTML = `<p>${message}</p>`;
  feedbackModal.show();
/*   
  document.querySelector('.modalBtn').addEventListener('click', () => {
    feedbackModal.hide();
  }); */
}

const feedbackModal = document.getElementById('feedbackModal');





/* feedbackModal.addEventListener('hidden.bs.modal', () => {
  feedbackModal.hide();
}); */

/* feedbackModal.addEventListener('hidden.bs.modal', () => {
  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(backdrop => backdrop.remove());
  document.body.classList.remove('modal-open');
 
}); */
// Eventlistener för att stänga modalen och rensa modal-backdrop

console.log(document.body); // Kontrollera att du får rätt <body> element
console.log(document.body.classList); // Kontrollera om classList är tillgängligt

