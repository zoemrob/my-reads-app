import React, { Component } from 'react';

class Book extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <li className="book">
                    <p>I am book {this.props.id}</p>
                </li>
            </React.Fragment>
        )
    }
}

export default Book;