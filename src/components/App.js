import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import MainHeader from './MainHeader';
import SearchHeader from './SearchHeader';
import * as BooksAPI from '../BooksAPI';
import { getIds, createBookshelf } from "../staticMethods";
import '../styles/App.css';
import SearchPage from "./SearchPage";

/**
 * Main controller for MyReads app
 */
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bookshelf: [],
            searchResults: [],
            query: ''
        };

        this.addToBookshelf = this.addToBookshelf.bind(this);
        this.setQuery = this.setQuery.bind(this);
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({bookshelf: books});
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.query !== this.state.query) {
            this._updateSearchResults(this.state.query);
        }
    }

    addToBookshelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => {
            const addedBook = {...book, shelf: shelf};

            this.setState(prevState => {
                const existingIds = getIds(prevState.bookshelf);
                if (existingIds.includes(addedBook.id)) {
                    return {bookshelf: prevState.bookshelf.map(prevBook => {
                        if (prevBook.id === addedBook.id) {
                            return addedBook;
                        } else {
                            return prevBook;
                        }
                    })}
                } else {
                    return {bookshelf: [...prevState.bookshelf, addedBook]}
                }
            })
        })
    }

    _updateSearchResults(query) {
        // Reference: https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
        if (!query.replace(/\s/g, '').length) {
            this.setState({searchResults: []});
        } else {
            BooksAPI.search(query.trim()).then(response => {
                if (typeof response.error !== "undefined") {
                    this.setState({searchResults: []})
                } else {
                    this.setState({searchResults: response})
                }
            });
        }
    }

    setQuery(query) {
        this.setState({query});
    }



    render() {
        const { searchResults, bookshelf, query } = this.state;
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
