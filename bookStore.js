import Book from './book.js';

class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.bookList = document.querySelector('#bookList');
  }

  addNewBook(title, author) {
    const newBook = new Book(title, author);
    this.books.push(newBook);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  removeBook(index) {
    this.books = this.books.filter((book, i) => i !== index);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  displayBooks() {
    this.bookList = document.getElementById('bookList');
    this.bookList.innerHTML = '';

    this.books.forEach((book, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <p>${book.title}</p>
        <p>${book.author}</p>        
      `;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        this.removeBook(index);
      });

      li.appendChild(removeBtn);
      li.className = 'book';
      this.bookList.appendChild(li);
    });
  }
}

const bookForm = document.getElementById('addForm');

const myCollection = new BookCollection();

function addBook(e) {
  e.preventDefault();

  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');

  if (titleInput.value === '' || authorInput.value === '') {
    return;
  }

  myCollection.addNewBook(titleInput.value, authorInput.value);

  titleInput.value = '';
  authorInput.value = '';
}

bookForm.addEventListener('submit', addBook);

myCollection.displayBooks();
