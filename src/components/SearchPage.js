import React from 'react';
import Book from './Book';
import '../styles/Bookshelf.css';
import '../styles/SearchPage.css';

const SearchPage = (props) => {
    const { searchResults, bookshelf, addToBookshelf } = props;


    return (
    <ul className="search-results">
        {
            searchResults.length > 0 ?
            searchResults.map(book =>
                <Book
                    key={book.id}
                    addToBookshelf={addToBookshelf}
                    //bookshelf={props.bookshelf}
                    book={{...book}}
                    shelf={}
                />) :
            <p className="no-results-text">There were no results.</p>
        }
    </ul>
)};


export default SearchPage;