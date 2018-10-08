import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import Select from '@material-ui/core/Select';
import '../styles/Book.css';

class Book extends Component {
    static propTypes = {
        key: PropTypes.string,
        addToBookshelf: PropTypes.func,
        book: PropTypes.object,
        shelf: PropTypes.string
    };

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

    render() {
        const { imageLinks, title, authors, shelf } = this.props.book;
        //debugger;
        return (
            <React.Fragment>
                <li className="book"
                    onMouseEnter={this.showMoveModal}
                    onMouseLeave={this.hideMoveModal}
                >
                    {typeof imageLinks !== "undefined" ? (
                        <img
                            src={imageLinks.thumbnail}
                            alt={`A thumbnail of the book ${title}`}
                        />
                    ) : <span>There is no image available</span>}

                    <h2 className="book-title">{title}</h2>
                    <p className="book-authors">
                        By: {typeof authors !== "undefined" ?
                        authors.join(', ') :
                        "Author Unknown"}
                    </p>
                    <select
                        value={shelf}
                        onChange={this.addToBookshelf}
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