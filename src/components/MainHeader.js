import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders the MainHeader component
 * @return JSX
 * @constructor
 */
const MainHeader = () => (
    <React.Fragment>
        <h1 className="main-page">My Reads</h1>
        <Link to="/search">
            <button className="search-button">Search</button>
        </Link>
    </React.Fragment>
);

export default MainHeader;