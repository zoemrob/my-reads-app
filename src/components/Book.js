import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import '../styles/Book.css';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMoveModalVisible: false
        };

        this.showMoveModal = this.showMoveModal.bind(this);
        this.hideMoveModal = this.hideMoveModal.bind(this);
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

    render() {
        const { imageLinks, title, authors } = this.props;

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
                    <p>{title}</p>
                    <p>
                        By: {typeof authors !== "undefined" ?
                        authors.join(', ') :
                        "Author Unknown"}
                    </p>
                    <Select autoWidth={true}>
                        <option>Want to read</option>
                        <option>Read</option>
                        <option>Reading</option>
                    </Select>
                </li>
            </React.Fragment>
        )
    }
}

export default Book;