function Book(author, title, numOfPages, alreadyRead) {
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  this.alreadyRead = alreadyRead;
}

addBookToLibrary = (bookArray, book) => {
  bookArray.push(book);
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
    </div>`);
  }
}

renderForm = () => {
  $('.enter-new-book').css('display', 'block');
}

$(document).ready(() => {
  $('.new-book').click(renderForm);
  
  let myLibrary = [];
  
  book1 = new Book("Writer One", "First Book", 299, true);
  book2 = new Book("Writer Two", "Second Book", 199, false);
  book3 = new Book("Writer One", "Third Book", 999, false);
  
  myLibrary.push(book1); 
  myLibrary.push(book2); 
  myLibrary.push(book3); 

  render(myLibrary);  
});