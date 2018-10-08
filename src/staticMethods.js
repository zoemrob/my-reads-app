// Utility static methods

/**
 * utility to pull id properties
 * @param bookArray {Array}
 * @return {Array}
 */
export const getIds = (bookArray) => {
    return bookArray.map(book => book.id);
};

/**
 * allows specific books to be sorted by shelf
 * @param allBooks {Array}: unsorted book array
 * @param shelf {String}: 'read' || 'wantToRead' || 'currentlyReading'
 * @return {Array}
 */
export const createBookshelf = (allBooks, shelf) => {
    return allBooks.filter(book => book.shelf === shelf);
};

/**
 * Creates an array based on App.state.searchResults that allows for searchResults to keep the bookshelf state
 * @param searchResults {Array}
 * @param existingBookshelf {Array}
 * @return {Array}
 */
export const mergeBookshelfAndSearchResults = (searchResults, existingBookshelf) => {
    // 1. if there are no search results, return empty array
    if (searchResults.length === 0) return [];
    // 2. if there are no books in the bookshelves, then return all of the unfiltered searchResults
    if (existingBookshelf.length === 0) return searchResults;

    // 3. find the existing matches from the searchResults
    const existingMatches = searchResults.map(result => existingBookshelf.filter(existing => existing.id === result.id)).flat(),
        // 4. get the ids of the books that are matched
        matchedIds = getIds(existingMatches),
        // 5. get only the searchResults that are not in the existing App.state.bookshelf
        filteredResults = searchResults.filter(result => !matchedIds.includes(result.id));
    // 6. return the existing matches joined with the filtered search results
    return existingMatches.concat(filteredResults);
};