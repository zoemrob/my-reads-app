import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: this.props.query
        };

        this.handleInput = this.handleInput.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const { setQuery } = this.props;

        if (this.state.query !== prevState.query) {
            setQuery(this.state.query);
        }
    }

    handleInput(event) {
        const newQuery = event.target.value.trim();
        this.setState({query: newQuery})
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