import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Bookshelf.css';

class Bookshelf extends Component{
    static propTypes = {
        reading: PropTypes.array,
        wantToRead: PropTypes.array,
        read: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.addToShelf = this.addToShelf.bind(this);
    }

    addToShelf(event) {

    }

    render() {
        return (
            <React.Fragment>
                <ul className="bookshelf">
                    <li>Test</li>
                </ul>
            </React.Fragment>
        )
    }
}

export default Bookshelf;