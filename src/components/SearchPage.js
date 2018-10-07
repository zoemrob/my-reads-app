import React from 'react';
import Book from './Book';
import '../styles/Bookshelf.css';
import '../styles/SearchPage.css';

const SearchPage = (props) => {
    const { searchResults, bookshelf, addToBookshelf, mergeBookshelfAndSearchResults } = props;
    const mergedBooks = mergeBookshelfAndSearchResults(searchResults, bookshelf);

    return (
    <ul className="search-results">
        {
            mergedBooks.length > 0 ?
            mergedBooks.map(book =>
                <Book
                    key={book.id}
                    addToBookshelf={addToBookshelf}
                    book={{...book}}
                    shelf={typeof book.shelf !== "undefined" ? book.shelf : "unselected"}
                />) :
            <p className="no-results-text">There were no results.</p>
        }
    </ul>
)};


export default SearchPage;