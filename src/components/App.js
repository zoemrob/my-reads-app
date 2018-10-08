import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import MainHeader from './MainHeader';
import SearchPage from "./SearchPage";
import SearchHeader from './SearchHeader';
import * as BooksAPI from '../BooksAPI';
import { getIds, createBookshelf } from "../staticMethods";
import '../styles/App.css';

/**
 * Main controller for MyReads app
 * @extends React.Component
 */
class App extends Component {

    constructor(props) {
        super(props);

        /**
         * @property bookshelf {Array}: represents the current books which are shelved
         * @property searchResults {Array}: represents the books fetched from the query
         * @property query {String}: the current query matching the searchResults
         */
        this.state = {
            bookshelf: [],
            searchResults: [],
            query: ''
        };

        this.addToBookshelf = this.addToBookshelf.bind(this);
        this.setQuery = this.setQuery.bind(this);
    }

    componentDidMount() {
        /** fetches the initial bookshelf stored at the server */
        BooksAPI.getAll().then(books => {
            this.setState({bookshelf: books});
        })
    }

    componentDidUpdate(prevProps, prevState) {
        /** only updates if the new query is different from the previous query */
        if (prevState.query !== this.state.query) {
            this._updateSearchResults(this.state.query);
        }
    }

    /**
     * Bound method to PUT to the server and update state
     * Replaces the existing book in state if it exists, else adds book to state
     * @param book {Object}: An object literal representation of a book
     * @param shelf {String}: 'wantToRead' || 'currentlyReading' || 'read'
     */
    addToBookshelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => {
            const addedBook = {...book, shelf: shelf};

            this.setState(prevState => {
                const existingIds = getIds(prevState.bookshelf);
                /** If the book exists in App.state.bookshelf, replace it */
                if (existingIds.includes(addedBook.id)) {
                    return {bookshelf: prevState.bookshelf.map(prevBook => {
                        if (prevBook.id === addedBook.id) {
                            return addedBook;
                        } else {
                            return prevBook;
                        }
                    })};
                /** else append addedBook to bookshelf */
                } else {
                    return {bookshelf: [...prevState.bookshelf, addedBook]}
                }
            })
        })
    }

    /**
     * @description fetches from server using query and updates App.state.searchResults
     * Trims the query string from all whitespace (to catch empty string)
     * Referenced: https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
     * @param query {String}: query from SearchHeader
     * @private
     */
    _updateSearchResults(query) {
        if (!query.replace(/\s/g, '').length) {
            // bypass API if empty string
            this.setState({searchResults: []});
        } else {
            BooksAPI.search(query.trim()).then(response => {
                // if no results, return empty array
                if (typeof response.error !== "undefined") {
                    this.setState({searchResults: []})
                } else {
                    this.setState({searchResults: response})
                }
            });
        }
    }

    /**
     * Bound Callback to pass as props to SearchHeader
     * @param query {String}
     */
    setQuery(query) {
        this.setState({query});
    }



    render() {
        const { searchResults, bookshelf, query } = this.state;
        /** define props to pass to Components */
        const searchHeaderProps = {
            setQuery: this.setQuery,
            query
        };

        const searchPageProps = {
            searchResults,
            bookshelf,
            addToBookshelf: this.addToBookshelf,
        };

        const bookshelfProps = {
            currentlyReading: createBookshelf(bookshelf, 'currentlyReading'),
            wantToRead: createBookshelf(bookshelf, 'wantToRead'),
            read: createBookshelf(bookshelf, 'read'),
            addToBookshelf: this.addToBookshelf
        };

        return (
            <React.Fragment>
                <header className="header">
                    <Route exact path='/' component={MainHeader}/>
                    <Route path='/search' render={() => (
                        <SearchHeader {...searchHeaderProps}/>
                    )}/>
                </header>
                <div className="page-content">
                    <Route exact path='/' render={() => (
                        <Bookshelf {...bookshelfProps}/>
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
