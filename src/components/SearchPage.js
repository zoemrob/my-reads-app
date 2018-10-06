import React from 'react';
import Book from './Book';
import '../styles/Bookshelf.css';
import '../styles/SearchPage.css';

const SearchPage = (props) => (
        <ul className="search-results">
            {
                props.searchResults.length > 0 ?
                props.searchResults.map(book =>
                    <Book
                        key={book.id}
                        addToBookshelf={props.addToBookshelf}
                        bookshelf={props.bookshelf}
                        book={{...book}}
                    />) :
                <p className="no-results-text">There were no results.</p>
            }
        </ul>
);


export default SearchPage;