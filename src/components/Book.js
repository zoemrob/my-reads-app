import React, { Component } from 'react';
//import Select from '@material-ui/core/Select';
import '../styles/Book.css';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMoveModalVisible: false
        };

        this.showMoveModal = this.showMoveModal.bind(this);
        this.hideMoveModal = this.hideMoveModal.bind(this);
        this.addToBookshelf = this.addToBookshelf.bind(this);
    }

    showMoveModal(e) {
        e.stopPropagation();
        if (!this.state.isMoveModalVisible) {
            this.setState({isMoveModalVisible: true});
        }
    }

    hideMoveModal(e) {
        e.stopPropagation();
        if (this.state.isMoveModalVisible) {
            this.setState({isMoveModalVisible: false})
        }
    }

    addToBookshelf(e) {
        e.stopPropagation();
        const { book, addToBookshelf } = this.props;
        if (e.target.value !== "unselected") {
            addToBookshelf(book, e.target.value);
        }
    }

    static getBookInBookshelf(bookId, bookshelf) {
        let selectedShelf = "unselected";

        for (let shelf in bookshelf) {
            if (bookshelf.hasOwnProperty(shelf)) {
                for (let len = bookshelf[shelf].length, i = 0; i < len; i++) {
                    selectedShelf = Book.checkBookInShelf(bookshelf[shelf][i], bookId, shelf);
                    if (selectedShelf !== "unselected") break;
                }
            }
        }

        return selectedShelf;
    }

    static checkBookInShelf(book, id, shelf) {
        if (book.id === id) {
            return shelf;
        }
    }

    render() {
        const { imageLinks, title, authors, id } = this.props.book;

        return (
            <React.Fragment>
                <li className="book"
                    onMouseEnter={this.showMoveModal}
                    onMouseLeave={this.hideMoveModal}
                >
                    <img
                        src={imageLinks.thumbnail}
                        alt={`A thumbnail of the book ${title}`}

                    />
                    <h2 className="book-title">{title}</h2>
                    <p className="book-authors">
                        By: {typeof authors !== "undefined" ?
                        authors.join(', ') :
                        "Author Unknown"}
                    </p>
                    <select
                        value={Book.getBookInBookshelf(id, this.props.bookshelf)}
                        onChange={this.addToBookshelf}
                    >
                        <option value="unselected" className="unselected">Not Applicable</option>
                        <option value="wantToRead">Want to read</option>
                        <option value="read">Read</option>
                        <option value="currentlyReading">Reading</option>
                    </select>
                </li>
            </React.Fragment>
        )
    }
}

export default Book;