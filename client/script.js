const url = 'http://localhost:5000/books';

fetch(url).then(data => data.json()).then(books =>{
    console.log(books);
});