import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import { mergeBookshelfAndSearchResults } from '../staticMethods';
import '../styles/Bookshelf.css';
import '../styles/SearchPage.css';

const SearchPage = (props) => {
    const { searchResults, bookshelf, addToBookshelf } = props;
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

SearchPage.propTypes = {
    /** Books with no shelf property from API */
    searchResults: PropTypes.array,
    /** Books in App.state.bookshelf */
    bookshelf: PropTypes.array,
    /** Bound method App.addToBookshelf to update a Book.shelf */
    addToBookshelf: PropTypes.func
};

export default SearchPage;