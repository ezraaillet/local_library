function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  let sortedAccounts = accounts.sort((a, b) => {
    // set last names to lowercase so we can use sort method
    let aCase = a.name.last.toUpperCase();
    let bCase = b.name.last.toUpperCase();

    if (aCase < bCase) {
      return -1;
    } else {
      return 1;
    }
    

  });
  return sortedAccounts;
};


function getTotalNumberOfBorrows(account, books) {
  // store account id in a variable
  let accId = account.id;
  // initialize borrow counter
  let borrowCounter = 0;
  // loop through all books
  for (let book of books) {
    // for each iteration seta books array to a variable
    let borrowedBooks = book.borrows;
    // loop through books array
    for (let i = 0; i < borrowedBooks.length; i++) {
      // check if each book id matches account id and increase borrow counter
      if (borrowedBooks[i].id === accId) {
        borrowCounter++
      }
    }
  }
  
    return borrowCounter;
}

function getBooksPossessedByAccount(account, books, authors) {
  // empty array for books
  const booksCheckedOut = [];
  // loop through books
  books.forEach((book) => {
    // borrows equal to most recently checked out
    let borrows = book.borrows[0];
    // borrows id is currently checked out by an account id
    if (borrows.returned === false && borrows.id === account.id) {
      // destructure books
      let { id, title, genre, authorId, author, borrows } = book;
      author = authors.find((author) => author.id === book.authorId);
      booksCheckedOut.push({ id, title, genre, authorId, author, borrows });
    }
  });
  return booksCheckedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
