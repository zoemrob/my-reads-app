import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import MainHeader from './MainHeader';
import SearchHeader from './SearchHeader';
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
                currentlyReading: [],
                wantToRead: [],
                read: []
            },
            searchResults: []
        };

        this.addToBookshelf = this.addToBookshelf.bind(this);
        this.updateSearchResults = this.updateSearchResults.bind(this);
    }

    addToBookshelf(book, shelf) {
        console.log("State:");
        console.log(this.state.bookshelf);

        BooksAPI.update(book, shelf).then(() => {
            switch (shelf) {
                case 'currentlyReading':
                    this.setState((prevState => ({
                        bookshelf: Object.assign(prevState.bookshelf, {currentlyReading: prevState.bookshelf.currentlyReading.concat([book])})
                    })));
                    break;
                case 'wantToRead':
                    this.setState((prevState => ({
                        bookshelf: Object.assign(prevState.bookshelf, { wantToRead: prevState.bookshelf.wantToRead.concat([book])})
                    })));
                    break;
                case 'read':
                    this.setState((prevState => ({
                        bookshelf: Object.assign(prevState.bookshelf, { read: prevState.bookshelf.read.concat([book])})
                    })));
                    break;
                default:
                    return;
            }
        })
    }

    updateSearchResults(query) {
        BooksAPI.search(query).then(books => this.setState({searchResults: books}));
    }

    render() {
        const { searchResults, bookshelf } = this.state;

        return (
            <React.Fragment>
                <header className="header">
                    <Route exact path='/' component={MainHeader}/>
                    <Route path='/search' render={() => (
                        <SearchHeader updateSearchResults={this.updateSearchResults} resultCount={searchResults.length}/>
                    )}/>
                </header>
                <div className="page-content">
                    <Route exact path='/' render={() => (
                        <Bookshelf {...bookshelf}/>
                    )}/>
                    <Route path='/search' render={() => (
                        <SearchPage searchResults={searchResults} bookshelf={bookshelf} addToBookshelf={this.addToBookshelf}/>
                    )}/>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
