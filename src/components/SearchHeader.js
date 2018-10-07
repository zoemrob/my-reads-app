import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };

        this.handleInput = this.handleInput.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const { query } = this.state;
        if (query !== prevState.query) {
            this.props.updateSearchResults(query.trim());
        }
    }

    handleInput(event) {
        this.setState({query: event.target.value});
    }

    render() {
        return (
            <React.Fragment>
                <Link to="/">
                    <button className="back-button">Back</button>
                </Link>
                <input
                    id="search-input"
                    placeholder="Search"
                    className="search-input"
                    type="text"
                    value={this.state.query}
                    onChange={this.handleInput}
                />
            </React.Fragment>
        )
    }
}

export default SearchHeader;