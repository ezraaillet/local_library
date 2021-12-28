// helper function to slice final result arrays
const sliceResult = arr => arr.slice(0, 5);

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  
  const borrowedCount = books.reduce((count, book) =>{
    if(book.borrows[0].returned == false){
      count++
    }
    return count;
  }, 0)
  return borrowedCount;
}

function getMostCommonGenres(books) {
  // set commonGenre variable + turn into object w/ name and count keys
  const getCommonGenres = books.reduce((acc, book) => {
    let { genre } = book;
    // if genre does not exist, object name + count = 0; else add to genre.count
    if (acc[genre] === undefined) {
      acc[genre] = { name: `${genre}`, count: 1 };
    } else {
      acc[genre].count++;
    }
    return acc;
  }, {});
  // Object.values() returns array w object values so that the count is accessible
  const allTotalGenres = Object.values(getCommonGenres);
  allTotalGenres.sort((a, b) => (a.count > b.count ? -1 : 1));
  // call helper function on final result and return
  return sliceResult(allTotalGenres);
}

function getMostPopularBooks(books) {
  // use map to count how many borrows of object w title
  const borrows = books.map((book) => {
    // each object returned has 2 keys
    return (mostPopular = {
      name: book.title,
      count: book.borrows.length,
    });
  });

  borrows.sort((a, b) => (a.count < b.count ? 1 : -1));
  // returns an array containing five objects or fewer even if tie
  return sliceResult(borrows);
}

function getMostPopularAuthors(books, authors) {
  // set empty array which will hold result
  let result = [];
  // loop through all book objects
  for (let book of books) {
    // loop through all author objects
    for (let author of authors) {
      // destructure book object for each loop iteration
      let { borrows, authorId } = book;
      // assign authors full name for each iteration
      let fullName = `${author.name.first} ${author.name.last}`;
      // check if author id of book matches corresponding author id
      if (authorId === author.id) {
        // push author name and book count to result array
        result.push({ name: `${fullName}`, count: borrows.length})
      }
    }
  }
  // sort result by count from most to least
  result.sort((a, b) => a.count > b.count ? -1 : 1);
  // return top 5 entries of result array
  return sliceResult(result);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
