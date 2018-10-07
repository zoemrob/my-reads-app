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
            bookshelf: [],
            searchResults: []
        };

        this.addToBookshelf = this.addToBookshelf.bind(this);
        this.updateSearchResults = this.updateSearchResults.bind(this);
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({bookshelf: books});
        })
    }

    componentDidUpdate() {
        BooksAPI.getAll().then(books => {
            this.setState({bookshelf: books});
        })
    }

    // static makeBookshelf(books, prevBookshelf = {}) {
    //     const currentlyReading = [],
    //         wantToRead = [],
    //         read = [];
    //
    //     for (let len = books.length, i = 0; i < len; i++) {
    //         switch (books[i].shelf) {
    //             case 'currentlyReading':
    //                 currentlyReading.push(books[i]);
    //                 break;
    //             case 'wantToRead':
    //                 wantToRead.push(books[i]);
    //                 break;
    //             case 'read':
    //                 read.push(books[i]);
    //                 break;
    //             default:
    //                 console.log('something whack happened in App.makeBookshelf');
    //         }
    //     }
    //
    //     const composed = {currentlyReading, wantToRead, read};
    //     return Object.assign(prevBookshelf, composed);
    // }

    addToBookshelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => {
            const addedBook = {...book, shelf: shelf};
            this.setState(prevState => {
                return {bookshelf: [...prevState.bookshelf, addedBook]};
            })
        })
    }

    updateSearchResults(query) {
        BooksAPI.search(query).then(books => this.setState({searchResults: books}));
    }

    static mergeBookshelfAndSearchResults(searchResults, existingBookshelf) {
        // return !(typeof searchResults === "undefined" || searchResults.length === 0) ?
        //     Object.assign(existingBookshelf, searchResults) :
        //     searchResults;
        if (typeof searchResults === "undefined" || typeof existingBookshelf === "undefined") return [];
        const existingMatches = searchResults.map(result => existingBookshelf.filter(existing => existing.id === result.id)).flat();
        const matchedIds = App.getIds(existingMatches);
        const final = searchResults.filter(result => !matchedIds.includes(result.id));
        //const filteredSearchResults = searchResults.filter(result => )
        debugger;
        return existingMatches.concat(final);
    }

    static getIds(bookArray) {
        return bookArray.map(book => book.id);
    }

    //
    // static checkBooks(searchResults, existingBookshelf) {
    //     const searchIds = App.getIds(searchResults),
    //         existingIds = App.getIds(existingBookshelf);
    //
    //     const matching = searchIds.map(searchResult => existingIds.filter(existingId => existingId === searchResult));
    // }

    render() {
        const { searchResults, bookshelf } = this.state;
        const searchPageProps = {
            searchResults: searchResults,
            bookshelf: bookshelf,
            addToBookshelf: this.addToBookshelf,
            mergeBookshelfAndSearchResults: App.mergeBookshelfAndSearchResults
        };

        return (
            <React.Fragment>
                <header className="header">
                    <Route exact path='/' component={MainHeader}/>
                    <Route path='/search' render={() => (
                        <SearchHeader updateSearchResults={this.updateSearchResults}/>
                    )}/>
                </header>
                <div className="page-content">
                    <Route exact path='/' render={() => (
                        <Bookshelf {...bookshelf}/>
                    )}/>
                    <Route path='/search' render={() => (
                        <SearchPage {...searchPageProps}/>
                    )}/>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
