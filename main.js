//sebuah variabel berisi array yang akan menampung beberapa object.
const books = [];

//Variabel RENDER_EVENT bertujuan untuk mendefinisikan Custom Event dengan nama 'render-book'. Custom event ini digunakan sebagai patokan dasar ketika ada perubahan data pada variabel books
const RENDER_EVENT = 'render-book';

document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });
});

function addBook() {
  const title = document.getElementById('inputBookTitle').value;
  const author = document.getElementById('inputBookAuthor').value;
  const timestamp = document.getElementById('inputBookYear').value;
  
  let isComplete = false;
  if (document.getElementById("inputBookIsComplete").checked) {
    isComplete = true;
  }
  const generatedID = bookId();
  const bookObject = generateBookObject(bookId, title, author, timestamp, false);
  books.push(bookObject);
 
  //me-render data yang telah disimpan pada array books.
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData()
}

//untuk menghasilkan identitas unik pada setiap item book. Untuk menghasilkan identitas yang unik, kita manfaatkan +new Date() untuk mendapatkan timestamp pada JavaScript.
function bookId() {
  return +new Date();
}
 
//untuk membuat object baru dari data yang sudah disediakan dari inputan (parameter function), diantaranya id, nama todo (task), waktu (timestamp), dan isCompleted (penanda todo apakah sudah selesai atau belum).
function generateBookObject(id, title, author, timestamp, isCompleted) {
  return {
    id,
    title,
    author,
    timestamp,
    isCompleted
  }
}

document.addEventListener(RENDER_EVENT, function () {
  console.log(books);
});

function makeBook(bookObject) {
  const title = document.createElement('h3');
  title.innerText = bookObject.title;

  const author = document.createElement('p');
  author.innerText = "Penulis: "+ bookObject.author;
 
  const timestamp = document.createElement('p');
  timestamp.innerText = "Tahun: "+ bookObject.timestamp;
 
  const textContainer = document.createElement('div');
  textContainer.classList.add('inner');
  textContainer.append(title, author, timestamp);
 
  const container = document.createElement('div');
  container.classList.add('item', 'shadow');
  container.append(textContainer);
  container.setAttribute('id', `todo-${bookObject.id}`);
 
  return container;
}

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBOOKList = document.getElementById('incompleteBookshelfList');
  uncompletedBOOKList.innerHTML = '';
 
  const completedBOOKList = document.getElementById('completeBookshelfList');
  completedBOOKList.innerHTML = '';
 
  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted)
      uncompletedBOOKList.append(bookElement);
    else
      completedBOOKList.append(bookElement);
  }
});

function removeBookFromCompleted(bookId) {
  const bookTarget = findBookIndex(bookId);
 
  if (bookTarget === -1) return;
 
  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
}
 
 
function undoBookFromCompleted(bookId) {
  const bookTarget = findBook(bookId);
 
  if (bookTarget == null) return;
 
  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
}