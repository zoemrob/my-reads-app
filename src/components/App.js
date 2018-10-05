import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import * as BooksAPI from '../BooksAPI';
import '../styles/App.css';
import SearchPage from "./SearchPage";

/**
 * Main controller for MyReads app
 */
class App extends Component {

    constructor(props) {
        super(props);

        /**
         * state of bookshelf at '/'
         * @type {{bookshelf: {reading: Array, wantToRead: Array, read: Array}}}
         */
        this.state = {
            bookshelf: {
                reading: [],
                wantToRead: [],
                read: []
            },
            searchResults: [{id: 'test-book'}]
        };

        this.addToBookshelf = this.addToBookshelf.bind(this);
        this.updateSearchResults = this.updateSearchResults.bind(this);
    }

    addToBookshelf(event) {

    }

    updateSearchResults(query) {
        BooksAPI.search(query).then(books => this.setState({searchResults: books}));
    }

    render() {
        const { searchResults, bookshelf } = this.state;

        return (
            <React.Fragment>
                <header className="header">
                    <Route exact path='/' render={({ history }) => (
                        <h1 className="main-page">My Reads</h1>
                    )}/>
                    <Route path='/search'/>
                </header>
                <div className="page-content">
                    <Route exact path='/' render={() => (
                        <Bookshelf {...bookshelf}/>
                    )}/>
                    <Route path='/search' render={() => (
                        <SearchPage searchResults={searchResults}/>
                    )}/>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
