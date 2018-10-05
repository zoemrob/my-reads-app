import React from 'react';
import Book from './Book';

const SearchPage = (props) => (
    <ul className="search-results">
        {props.searchResults.map(book => <Book {...book}/>)}
    </ul>
);

export default SearchPage;