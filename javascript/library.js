const { $ } = window;

function Book(title, author, numOfPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.readStatus = readStatus;
}

Book.prototype.toggleRead = function toggleRead() {
  this.readStatus = !this.readStatus;
};

function addBookToLibrary(event, bookLibrary, firebase) {
  $('.add-book').removeClass('display');
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = Number(document.getElementById('num-of-pages').value);
  const readStatus = !!document.getElementById('true').checked;
  const index = bookLibrary == null ? 0 : bookLibrary.length;
  const book = new Book(title, author, pages, readStatus);

  firebase
    .database()
    .ref(`books/${index}`)
    .set(book);

  return false;
}

function removeBook(event, firebase) {
  event.preventDefault();
  firebase
    .database()
    .ref(`books/${$(event.target).data('index-number')}`)
    .remove();
}

function changeReadStatus(event, firebase) {
  firebase
    .database()
    .ref(`books/${$(event.target).data('index-number')}`)
    .once('value')
    .then((snapshot) => {
      const book = new Book();
      Object.assign(book, snapshot.val());
      book.toggleRead();
      firebase
        .database()
        .ref(`books/${$(event.target).data('index-number')}`)
        .set(book);
    });
}

function render(myLibrary, firebase) {
  let htmlString = '';

  if (myLibrary != null) {
    for (let i = 0; i < myLibrary.length; i += 1) {
      if (myLibrary[i] != null) {
        htmlString += `<div class="book">
        <div class="title">${myLibrary[i].title}</div>
        <div class="author">${myLibrary[i].author}</div>
        <div class="info">
        <div class="pages">${myLibrary[i].numOfPages}</div>
        <div class="already-read">${myLibrary[i].readStatus}</div>
        </div>
        <button class="delete-button" data-index-number="${i}">Delete</button>
        <button class="read-button" data-index-number="${i}">${
  myLibrary[i].readStatus ? 'Mark as unread' : 'Mark as read'
}</button>
        </div>`;
      }
    }
  }

  htmlString += '</div>';

  $('.book-wrapper').html(htmlString);

  const callbackClosureDelete = (event) => {
    removeBook(event, firebase);
  };

  const callbackClosureRead = (event) => {
    changeReadStatus(event, firebase);
  };

  const callbackClosure = (event) => {
    addBookToLibrary(event, myLibrary, firebase);
  };

  $('.submit').off('click');
  $('.submit').click(callbackClosure);
  $('.delete-button').click(callbackClosureDelete);
  $('.read-button').click(callbackClosureRead);
}

const renderForm = () => {
  $('.add-book').addClass('display');
};

$(document).ready(() => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCGUXTnbhijDmdUm5T1B-4uIBMRBKk6KkU',
    authDomain: 'library-31ed8.firebaseapp.com',
    databaseURL: 'https://library-31ed8.firebaseio.com',
    projectId: 'library-31ed8',
    storageBucket: 'library-31ed8.appspot.com',
    messagingSenderId: '282261117872',
    appId: '1:282261117872:web:c2124a8508d1f98e305475',
    measurementId: 'G-D260PYVPK6',
  };


  /* eslint-disable no-undef */
  firebase.initializeApp(firebaseConfig);

  const dbRefOject = firebase.database().ref().child('books');

  dbRefOject.on('value', (snap) => {
    render(snap.val(), firebase);
  });
  /* eslint-enable no-undef */

  $('.new-book').click(renderForm);
});
