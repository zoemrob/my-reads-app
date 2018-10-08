import React from 'react';
import Book from './Book';
import '../styles/Bookshelf.css';

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


export default Bookshelf;