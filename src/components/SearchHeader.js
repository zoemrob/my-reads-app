import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Controlled component SearchHeader
 * @extends React.Component
 */
class SearchHeader extends Component {
    static propTypes = {
        /** string passed as initial state from authority App */
        query: PropTypes.string,
        /** bound method App.setQuery used to update App.state.query */
        setQuery: PropTypes.func
    };

    constructor(props) {
        super(props);
        /**
         * @property query {String}: query string held in state to keep proper validation and prevent unnecessary updates
         */
        this.state = {
            query: this.props.query
        };

        this._handleInput = this._handleInput.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const { setQuery } = this.props;
        /** Update App.state.query only if component did update and query is different */
        if (this.state.query !== prevState.query) {
            setQuery(this.state.query);
        }
    }

    /**
     * Update the state from the input.value
     * @param event {KeyboardEvent}
     * @private
     */
    _handleInput(event) {
        const newQuery = event.target.value;
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
                    onChange={this._handleInput}
                />
            </React.Fragment>
        )
    }
}

export default SearchHeader;