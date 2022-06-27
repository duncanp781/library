const addBookButton = document.getElementById('add-book');
const bookForm = document.getElementById('book-modal');
const closeModalButton = document.getElementById('modal-close');
const form = document.getElementById('add-book-form');


let myLibrary = [];

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.readString = function(){
    if(read){
      return 'read';
    }else{
      return 'not read yet';
    }
  }
  this.display = function(){
    return `${title} by ${author}, ${pages} pages, ${this.readString()}`;
  }
}

function addBookToLibrary(book){
  myLibrary.push(book);
}

function displayLibrary(){
  for(item of myLibrary){
    displayBook(item);
  }
}
function createCard(book){
  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('div');
  title.classList.add('title');
  title.textContent = `Title: ${book.title}` ;
  const author = document.createElement('div');
  author.classList.add('author');
  author.textContent = `Author: ${book.author}`;
  const pages = document.createElement('div');
  pages.classList.add('pages');
  pages.textContent = `Pages: ${book.pages}`;

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);

  return card;
}


function displayBook(book){
  const cards = document.querySelector('.cards');
  const card = createCard(book);
  cards.appendChild(card);
}

addBookButton.addEventListener('click', openModal);

function openModal(){
  bookForm.style.display = 'flex';
}

function closeModal(){
  form.reset();
  bookForm.style.display = 'none';
}

bookForm.addEventListener('click', (e) =>{
  if (e.target == bookForm){
    closeModal();
  }
})

closeModalButton.addEventListener('click', closeModal);

form.addEventListener('submit', (e) =>{
  e.preventDefault();
  addBookFromDom();
  form.reset();
  closeModal();
});

function addBookFromDom(){
  let title = document.getElementById('book-title').value;
  let author = document.getElementById('book-author').value;
  let pages = document.getElementById('book-pages').value;
  let read = document.getElementById('book-read').value;
  let newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  displayLibrary();
}