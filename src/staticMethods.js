// Utility static methods

export const getIds = (bookArray) => {
    return bookArray.map(book => book.id);
};

/**
 *
 * @param allBooks
 * @param shelf {String}: 'read' || 'wantToRead' || 'currentlyReading'
 * @return {*}
 */
export const createBookshelf = (allBooks, shelf) => {
    return allBooks.filter(book => book.shelf === shelf);
};

export const mergeBookshelfAndSearchResults = (searchResults, existingBookshelf) => {
    //if (typeof searchResults === "undefined" || typeof existingBookshelf === "undefined") return [];
    if (searchResults.length === 0) return [];
    if (existingBookshelf.length === 0) return searchResults;

    const existingMatches = searchResults.map(result => existingBookshelf.filter(existing => existing.id === result.id)).flat(),
        matchedIds = getIds(existingMatches),
        filteredResults = searchResults.filter(result => !matchedIds.includes(result.id));

    return existingMatches.concat(filteredResults);
};