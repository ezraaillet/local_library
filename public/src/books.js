function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let returnedBooks = books.filter((book) => book.borrows.every((borrow) => borrow.returned === true))
  let borrowedBooks = books.filter((book) => book.borrows.some((borrow) => borrow.returned === false))
  return [[...borrowedBooks], [...returnedBooks]]
}

function getBorrowersForBook(book, accounts) {
  // array we want to return
  let accountsArr = [];
  // assign borrows array to a variable
  let bookBorrows = book.borrows;
  // loop through each account object
  for (let account of accounts) {
    // early exit if result array is too long
    if (accountsArr.length > 9) {
      break;
    }
    // loop through borrows array
    for (let i = 0; i < bookBorrows.length; i++) {
      // destructure account object
      let { id, returned, picture, age, name, company, email, registered } = account
      // assign returned value
      returned = bookBorrows[i].returned;
      if (account.id === bookBorrows[i].id) {
        accountsArr.push({id, returned, picture, age, name, company, email, registered});
      }
    }
      
  }
  return accountsArr;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
