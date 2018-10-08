import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Book.css';

/**
 * Represents a book
 * @extends React.Component
 */
class Book extends Component {
    static propTypes = {
        /** function passed from App */
        addToBookshelf: PropTypes.func,
        /** book object properties */
        book: PropTypes.object,
        /** shelf to display book: 'currentlyReading'||'wantToRead'||'read' */
        shelf: PropTypes.string
    };

    /**
     * to create a Book
     * @param props {Object}
     */
    constructor(props) {
        super(props);
        /**
         * State representing if the shelf selection modal is visible
         * @type {{isMoveModalVisible: boolean}}
         */
        this.state = {
            isMoveModalVisible: false
        };

        this._showMoveModal = this._showMoveModal.bind(this);
        this._hideMoveModal = this._hideMoveModal.bind(this);
        this._addToBookshelf = this._addToBookshelf.bind(this);
    }

    /**
     * makes move modal visible
     * @param e {MouseEvent}
     * @private
     */
    _showMoveModal(e) {
        e.stopPropagation();
        if (!this.state.isMoveModalVisible) {
            this.setState({isMoveModalVisible: true});
        }
    }

    /**
     * makes move modal hidden
     * @param e {MouseEvent}
     * @private
     */
    _hideMoveModal(e) {
        e.stopPropagation();
        if (this.state.isMoveModalVisible) {
            this.setState({isMoveModalVisible: false})
        }
    }

    /**
     * wraps App.addToBookshelf in a conditional
     * @param e {KeyboardEvent}
     * @private
     */
    _addToBookshelf(e) {
        e.stopPropagation();
        const { book, addToBookshelf } = this.props;
        if (e.target.value !== "unselected") {
            addToBookshelf(book, e.target.value);
        }
    }

    render() {
        const { imageLinks, title, authors, shelf } = this.props.book;

        return (
            <React.Fragment>
                <li className="book"
                    onMouseEnter={this._showMoveModal}
                    onMouseLeave={this._hideMoveModal}
                >
                    {   /** @description: if there are no imageLinks, return a <span> */
                        typeof imageLinks !== "undefined" ? (
                        <img
                            src={imageLinks.thumbnail}
                            alt={`A thumbnail of the book ${title}`}
                        />
                        ) : <span>There is no image available</span>
                    }

                    <h2 className="book-title">{title}</h2>
                    <p className="book-authors">
                        {/** @description: If there are no authors, return Author Unknown */}
                        By: {typeof authors !== "undefined" ?
                        authors.join(', ') :
                        "Author Unknown"}
                    </p>
                    <select
                        value={shelf}
                        onChange={this._addToBookshelf}
                        className={this.state.isMoveModalVisible ? undefined : "hidden"}
                    >
                        <option value="unselected" className="unselected">None</option>
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