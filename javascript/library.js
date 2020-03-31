function Book(title, author, numOfPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.readStatus = readStatus;
}

Book.prototype.toggleRead = function () {
  this.readStatus = !this.readStatus;
};

addBookToLibrary = (event, bookLibrary, firebase) => {
  $(".add-book").css("display", "none");
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = parseInt(document.getElementById("num-of-pages").value);
  let readStatus = document.getElementById("true").checked ? true : false;
  let index = bookLibrary == null ? 0 : bookLibrary.length;
  let book = new Book(title, author, pages, readStatus);

  firebase
    .database()
    .ref("books/" + index)
    .set(book);

  return false;
};

removeBook = (event, firebase) => {
  event.preventDefault();
  firebase
    .database()
    .ref("books/" + $(event.target).data("index-number"))
    .remove();
};

changeReadStatus = (event, firebase) => {
  firebase
    .database()
    .ref("books/" + $(event.target).data("index-number"))
    .once("value")
    .then(function (snapshot) {
      let book = new Book();
      Object.assign(book, snapshot.val());
      book.toggleRead();
      firebase
        .database()
        .ref("books/" + $(event.target).data("index-number"))
        .set(book);
    });
};

render = (myLibrary, firebase) => {
  let htmlString = ``;

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
      <button class="read-button" data-index-number="${i}">${
        myLibrary[i].readStatus ? "Mark as unread" : "Mark as read"
      }</button>
      </div>`;
    }
  }

  htmlString += "</div>";

  $(".book-wrapper").html(htmlString);

  callbackClosureDelete = (event) => {
    removeBook(event, firebase);
  };

  callbackClosureRead = (event) => {
    changeReadStatus(event, firebase);
  };

  callbackClosure = (event) => {
    addBookToLibrary(event, myLibrary, firebase);
  };

  $(".submit").off("click");
  $(".submit").click(callbackClosure);
  $(".delete-button").click(callbackClosureDelete);
  $(".read-button").click(callbackClosureRead);
};

renderForm = () => {
  $(".add-book").css("display", "flex");
};

$(document).ready(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyCGUXTnbhijDmdUm5T1B-4uIBMRBKk6KkU",
    authDomain: "library-31ed8.firebaseapp.com",
    databaseURL: "https://library-31ed8.firebaseio.com",
    projectId: "library-31ed8",
    storageBucket: "library-31ed8.appspot.com",
    messagingSenderId: "282261117872",
    appId: "1:282261117872:web:c2124a8508d1f98e305475",
    measurementId: "G-D260PYVPK6",
  };

  firebase.initializeApp(firebaseConfig);

  const dbRefOject = firebase.database().ref().child("books");

  dbRefOject.on("value", (snap) => {
    render(snap.val(), firebase);
  });

  $(".new-book").click(renderForm);
});
