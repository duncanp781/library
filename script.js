const addBookButton = document.getElementById('add-book');
const bookForm = document.getElementById('book-modal');
const closeModalButton = document.getElementById('modal-close');
const form = document.getElementById('add-book-form');


let myLibrary = [];

function Book(title, author, pages, read){
  this.createdTime = new Date();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.displayed = false;
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
  book.index = myLibrary.length;
  myLibrary.push(book);
}

function displayLibrary(){
  for(item of myLibrary){
    if (!item.displayed){
      displayBook(item);
      item.displayed = true;
    }
  }
}
function createCard(book){
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('index', book.index);

  const garbage = document.createElement('div');
  garbage.addEventListener('click', () => removeFromLibrary(book));
  garbage.textContent = 'X';

  const title = document.createElement('div');
  title.classList.add('title');
  title.textContent = `Title: ${book.title}` ;

  const author = document.createElement('div');
  author.classList.add('author');
  author.textContent = `Author: ${book.author}`;

  const pages = document.createElement('div');
  pages.classList.add('pages');
  pages.textContent = `Pages: ${book.pages}`;

  card.appendChild(garbage);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);

  book.card = card;
  return card;
}


function removeFromLibrary(book){
  myLibrary.splice(book.index,1);
  const card = book.card;
  card.remove();
  for(let i = book.index; i < myLibrary.length; i++){
    myLibrary[i].index -=1;
  }

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