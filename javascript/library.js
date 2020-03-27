function Book(author, title, numOfPages, alreadyRead) {
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  this.alreadyRead = alreadyRead;
}

addBookToLibrary = (bookLibrary) => {
  let bookInfo = $(".enter-new-book").serializeArray();
  book = new Book(bookInfo[0].value, bookInfo[1].value, parseInt(bookInfo[2].value), bookInfo[3].value === "true" ? true : false);
  bookLibrary.push(book);
  addOneBook(book, bookLibrary.length - 1);
  $('.enter-new-book').css('display', 'none');
  return false;
}

addOneBook = (book, index) => {
  $('body').append(`<div class="book">
    <div class="title">${book.title}</div>
    <div class="author">${book.author}</div>
    <div class="info">
      <div class="pages">${book.numOfPages}</div>
      <div class="already-read">${book.alreadyRead}</div>
    </div>
    <button class="delete-button" data-index-number="${index}">Delete</button>
  </div>`);
}

removeBook = () => {
  console.log('something');
  console.log($(this));
}

render = (myLibrary) => {
  for (let i = 0; i < myLibrary.length; i++) {
    $('body').append(`<div class="book">
      <div class="title">${myLibrary[i].title}</div>
      <div class="author">${myLibrary[i].author}</div>
      <div class="info">
        <div class="pages">${myLibrary[i].numOfPages}</div>
        <div class="already-read">${myLibrary[i].alreadyRead}</div>
      </div>
      <button class="delete-button" data-index-number="${i}">Delete</button>
    </div>`);
  }
}

renderForm = () => {
  $('.enter-new-book').css('display', 'block');
}

$(document).ready(() => {
  let myLibrary = [];
  $('.new-book').click(renderForm);
  function callbackClosure(myLibrary, addBookToLibrary) {
    return function() {
      return addBookToLibrary(myLibrary);
    }
  }
  $('.enter-new-book').submit(callbackClosure(myLibrary, addBookToLibrary));
  
  book1 = new Book("Writer One", "First Book", 299, true);
  book2 = new Book("Writer Two", "Second Book", 199, false);
  book3 = new Book("Writer One", "Third Book", 999, false);
  
  myLibrary.push(book1); 
  myLibrary.push(book2); 
  myLibrary.push(book3); 

  render(myLibrary);
  $('.delete-button').click(removeBook);
});