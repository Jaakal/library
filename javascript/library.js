function Book(author, title, numOfPages, readStatus) {
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  this.readStatus = readStatus;
}

Book.prototype.toggleRead = function(){
  this.readStatus = !this.readStatus;
}

addBookToLibrary = (bookLibrary, firebase) => {
  let bookInfo = $(".enter-new-book").serializeArray();
  let index = bookLibrary == null ? 0 : bookLibrary.length;
  let book = new Book(bookInfo[0].value, bookInfo[1].value, parseInt(bookInfo[2].value), bookInfo[3].value === "true" ? true : false);
  
  firebase.database().ref('books/' + index).set(book);
  
  return false;
}

removeBook = (event, firebase) => {
  firebase.database().ref('books/' + $(event.target).data('index-number')).remove();
}

changeReadStatus = (event, firebase) => {
  firebase.database().ref('books/' + $(event.target).data('index-number')).once('value').then( function(snapshot) {
    let book = new Book;
    Object.assign(book, snapshot.val())
    book.toggleRead();
    firebase.database().ref('books/' + $(event.target).data('index-number')).set(book);
  });
}

render = (myLibrary, firebase) => {
  let htmlString = '';
  
  if (myLibrary != null) {
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i] == null) {
        continue;
      }

      htmlString += `<div class="book">
      <div class="title">${myLibrary[i].title}</div>
      <div class="author">${myLibrary[i].author}</div>
      <div class="info">
      <div class="pages">${myLibrary[i].numOfPages}</div>
      <div class="already-read">${myLibrary[i].readStatus}</div>
      </div>
      <button class="delete-button" data-index-number="${i}">Delete</button>
      <button class="read-button" data-index-number="${i}">${myLibrary[i].readStatus ? "Mark as unread" : "Mark as read"}</button>
      </div>`;
    }
  }

  $('.book-wrapper').html(htmlString);
   
  function callbackClosure(myLibrary, firebase, addBookToLibrary) {
    return function() {
      return addBookToLibrary(myLibrary, firebase);
    }
  }

  $('.new-book').click(renderForm);
  $('.enter-new-book').submit(callbackClosure(myLibrary, firebase, addBookToLibrary));
  
  callbackClosureDelete = (event) => {
    removeBook(event, firebase);
  }

  callbackClosureRead = (event) => {
    changeReadStatus(event, firebase);
  }
  
  $('.delete-button').click(callbackClosureDelete);
  $('.read-button').click(callbackClosureRead);
}

renderForm = () => {
  $('.enter-new-book').css('display', 'block');
}

$(document).ready(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyCGUXTnbhijDmdUm5T1B-4uIBMRBKk6KkU",
    authDomain: "library-31ed8.firebaseapp.com",
    databaseURL: "https://library-31ed8.firebaseio.com",
    projectId: "library-31ed8",
    storageBucket: "library-31ed8.appspot.com",
    messagingSenderId: "282261117872",
    appId: "1:282261117872:web:c2124a8508d1f98e305475",
    measurementId: "G-D260PYVPK6"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const dbRefOject = firebase.database().ref().child('books');
  
  dbRefOject.on('value', snap => {
    render(snap.val(), firebase);
  });
});