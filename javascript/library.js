function Book(author, title, numOfPages, alreadyRead) {
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  this.alreadyRead = alreadyRead;
}

Book.prototype.toggleRead = function(){
  this.alreadyRead = !this.alreadyRead;
}

addBookToLibrary = (bookLibrary) => {
  let bookInfo = $(".enter-new-book").serializeArray();
  book = new Book(bookInfo[0].value, bookInfo[1].value, parseInt(bookInfo[2].value), bookInfo[3].value === "true" ? true : false);
  bookLibrary.push(book);
  render(bookLibrary);
  return false;
}

// addOneBook = (book, index) => {
//   $('body').append(`<div class="book">
//     <div class="title">${book.title}</div>
//     <div class="author">${book.author}</div>
//     <div class="info">
//       <div class="pages">${book.numOfPages}</div>
//       <div class="already-read">${book.alreadyRead}</div>
//     </div>
//     <button class="delete-button" data-index-number="${index}">Delete</button>
//   </div>`);
// }

removeBook = (event, myLibrary) => {
  console.log($(event.target).data('index-number'));

  myLibrary.splice($(event.target).data('index-number'), 1);
  render(myLibrary);
}

changeReadStatus = (event, myLibrary) => {
  book = myLibrary[$(event.target).data('index-number')];
  console.log(book);
  book.toggleRead();
  render(myLibrary);
}

render = (myLibrary) => {
  $('body').html(`
  <button class="new-book" type="button">New book</button>

  <form class="enter-new-book">
    <label for="author">Author:</label><br>
    <input type="text" id="author" name="author"><br>

    <label for="title">Title:</label><br>
    <input type="text" id="title" name="title"><br>
    
    <label for="num-of-pages">Number of pages:</label><br>
    <input type="text" id="num-of-pages" name="num-of-pages"><br>
    
    <label for="title">Already read:</label><br>
    <input type="radio" id="true" name="already-read" value="true">
    <label for="true">True</label>
    <input type="radio" id="false" name="already-read" value="false">
    <label for="false">False</label>

    <input name="submit" type="submit" value="Submit">
  </form>`);


  for (let i = 0; i < myLibrary.length; i++) {
    $('body').append(`<div class="book">
      <div class="title">${myLibrary[i].title}</div>
      <div class="author">${myLibrary[i].author}</div>
      <div class="info">
        <div class="pages">${myLibrary[i].numOfPages}</div>
        <div class="already-read">${myLibrary[i].alreadyRead}</div>
      </div>
      <button class="delete-button" data-index-number="${i}">Delete</button>
      <button class="read-button" data-index-number="${i}">${myLibrary[i].alreadyRead ? "Mark as unread" : "Mark as read"}</button>
    </div>`);
  }

   
  function callbackClosure(myLibrary, addBookToLibrary) {
    return function() {
      return addBookToLibrary(myLibrary);
    }
  }

  $('.new-book').click(renderForm);
  $('.enter-new-book').submit(callbackClosure(myLibrary, addBookToLibrary));
  
  callbackClosureDelete = (event) => {
    removeBook(event, myLibrary);
  }

  callbackClosureRead = (event) => {
    changeReadStatus(event, myLibrary);
  }
  
  $('.delete-button').click(callbackClosureDelete);
  $('.read-button').click(callbackClosureRead);
}

renderForm = () => {
  $('.enter-new-book').css('display', 'block');
}

$(document).ready(() => {
  let myLibrary = [];
 
  
  book1 = new Book("Writer One", "First Book", 299, true);
  book2 = new Book("Writer Two", "Second Book", 199, false);
  book3 = new Book("Writer One", "Third Book", 999, false);
  
  myLibrary.push(book1); 
  myLibrary.push(book2); 
  myLibrary.push(book3); 
  
  render(myLibrary);

  
});