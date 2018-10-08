import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
import '../styles/Bookshelf.css';

/**
 * Bookshelf Component holding 3 shelves of Book Components
 * @param props
 * @return JSX
 * @constructor
 */
const Bookshelf = props => {
    const { read, wantToRead, currentlyReading, addToBookshelf } = props;

    return (
        <React.Fragment>
            <label htmlFor="currentlyReadingBookshelf" className="bookshelf-label">Currently Reading</label>
            <ul id="currentlyReadingBookshelf" className="bookshelf currentlyReading">
                {currentlyReading.map(book => (
                    <Book
                        key={book.id}
                        addToBookshelf={addToBookshelf}
                        book={book}
                        shelf={book.shelf}
                    />
                ))}
            </ul>
            <label htmlFor="wantToReadBookshelf" className="bookshelf-label">Want to Read</label>
            <ul id="wantToReadBookshelf" className="bookshelf wantToRead">
                {wantToRead.map(book => (
                    <Book
                        key={book.id}
                        addToBookshelf={addToBookshelf}
                        book={book}
                        shelf={book.shelf}
                    />
                ))}
            </ul>
            <label htmlFor="readBookshelf" className="bookshelf-label">Read</label>
            <ul id="readBookshelf" className="bookshelf read">
                {read.map(book => (
                    <Book
                        key={book.id}
                        addToBookshelf={addToBookshelf}
                        book={book}
                        shelf={book.shelf}
                    />
                ))}
            </ul>
        </React.Fragment>
)};

Bookshelf.propTypes = {
    /** array of Book objects in 'read' shelf */
    read: PropTypes.array,
    /** array of Book object in 'wantToRead' shelf */
    wantToRead: PropTypes.array,
    /** array of Book objects in 'currentlyReading' shelf */
    currentlyReading: PropTypes.array,
    /** bound method App.addToBookshelf to move Books from shelves */
    addToBookshelf: PropTypes.func
};

export default Bookshelf;