let myLibrary = [];


const addBookButton = document.getElementById('add-book');
addBookButton.addEventListener('click', openModal);


const bookForm = document.getElementById('book-modal');
bookForm.addEventListener('click', (e) =>{
  if (e.target == bookForm){
    closeModal();
  }
})


const closeModalButton = document.getElementById('modal-close');
closeModalButton.addEventListener('click', closeModal);


const form = document.getElementById('add-book-form');
form.addEventListener('submit', (e) =>{
  e.preventDefault();
  addBookFromDom();
  form.reset();
  closeModal();
});

class Book{
  constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.createdTime = new Date();
  }

  readString= () => {
    if(this.read){
      return 'Read';
    }else{
      return 'Unread';
    }
  }

  display = () => {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readString()}`;
  }

  toggleRead = () => {
    this.read = !this.read;
  }
}

function addBookToLibrary(book){
  book.index = myLibrary.length;
  myLibrary.push(book);
}

function removeFromLibrary(book){
  myLibrary.splice(book.index,1);
  const card = book.card;
  card.remove();
  for(let i = book.index; i < myLibrary.length; i++){
    myLibrary[i].index -=1;
  }
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

  

  const title = document.createElement('div');
  title.classList.add('title');
  title.textContent = `Title: ${book.title}` ;

  const author = document.createElement('div');
  author.classList.add('author');
  author.textContent = `Author: ${book.author}`;

  const pages = document.createElement('div');
  pages.classList.add('pages');
  pages.textContent = `Pages: ${book.pages}`;

  const status = document.createElement('button');
  status.classList.add('status');
  status.textContent = `Status: ${book.readString()}`;
  status.addEventListener('click', () => {
    book.toggleRead();
    status.textContent = `Status: ${book.readString()}`;
  });


  const garbage = document.createElement('button');
  garbage.addEventListener('click', () => removeFromLibrary(book));
  garbage.textContent = 'X';


  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(status);
  card.appendChild(garbage);

  
  book.card = card;
  return card;
}

function addBookFromDom(){
  let title = document.getElementById('book-title').value;
  let author = document.getElementById('book-author').value;
  let pages = document.getElementById('book-pages').value;
  let read= document.getElementById('book-read').checked;
  let newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  displayLibrary();
}

function displayBook(book){
  const cards = document.querySelector('.cards');
  const card = createCard(book);
  cards.appendChild(card);
}



function openModal(){
  bookForm.style.display = 'flex';
}

function closeModal(){
  form.reset();
  bookForm.style.display = 'none';
}





