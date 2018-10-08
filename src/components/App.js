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
            searchResults: [],
            query: ''
        };

        this.addToBookshelf = this.addToBookshelf.bind(this);
        this.updateSearchResults = this.updateSearchResults.bind(this);
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({bookshelf: books});
        })
    }

    addToBookshelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => {
            const addedBook = {...book, shelf: shelf};

            this.setState(prevState => {
                const existingIds = App.getIds(prevState.bookshelf);
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

    updateSearchResults(query) {
        if (query === '') {
            this.setState({searchResults: []});
        } else {
            BooksAPI.search(query).then(response => {
                //debugger;
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

    static mergeBookshelfAndSearchResults(searchResults, existingBookshelf) {
        //if (typeof searchResults === "undefined" || typeof existingBookshelf === "undefined") return [];
        if (searchResults.length === 0) return [];
        if (existingBookshelf.length === 0) return searchResults;

        const existingMatches = searchResults.map(result => existingBookshelf.filter(existing => existing.id === result.id)).flat(),
            matchedIds = App.getIds(existingMatches),
            filteredResults = searchResults.filter(result => !matchedIds.includes(result.id));

        return existingMatches.concat(filteredResults);
    }

    static getIds(bookArray) {
        return bookArray.map(book => book.id);
    }

    /**
     *
     * @param allBooks
     * @param shelf {String}: 'read' || 'wantToRead' || 'currentlyReading'
     * @return {*}
     */
    static createBookshelf(allBooks, shelf) {
        return allBooks.filter(book => book.shelf === shelf);
    }

    render() {
        const { searchResults, bookshelf } = this.state;
        const searchPageProps = {
            searchResults: searchResults,
            bookshelf: bookshelf,
            addToBookshelf: this.addToBookshelf,
            mergeBookshelfAndSearchResults: App.mergeBookshelfAndSearchResults
        };

        const bookshelfProps = {
            currentlyReading: App.createBookshelf(bookshelf, 'currentlyReading'),
            wantToRead: App.createBookshelf(bookshelf, 'wantToRead'),
            read: App.createBookshelf(bookshelf, 'read'),
            addToBookshelf: this.addToBookshelf
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
