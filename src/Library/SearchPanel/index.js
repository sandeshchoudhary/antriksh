import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Spinner } from 'react-bootstrap';
import { searchBooks } from '../../reducers/action';
import BooksList from './BooksList';

class SearchPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchOption: 'bname'
    };
  }

  /**
   * handle search option selection
   */
  handleRadioInput = value => {
    this.setState({ searchOption: value });
  };

  /**
   * Handle text change in search box
   */
  handleTextInput = event => {
    this.setState({ query: event.target.value });
  };

  /**
   * Handle key press on search box
   */
  handleKeyPress = event => {
    if (event.key === 'Enter' && this.state.query) {
      this.handleSearch();
    }
  };

  /**
   * Handle search
   */
  handleSearch = () => {
    const { searchBooks } = this.props;
    const { query, searchOption } = this.state;
    if (searchOption === 'bname') {
      searchBooks({ q: query }, 'bname');
    } else {
      searchBooks(
        {
          bibkeys: `ISBN:${query}`,
          format: 'json',
          jscmd: 'data'
        },
        'isbn'
      );
    }
  };

  /**
   * Render Search panel
   */
  renderSearchPanel = () => {
    const { booksLoading } = this.props;
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h4>Explore Books Here</h4>
        <div>
          <input
            type="text"
            onKeyPress={ev => this.handleKeyPress(ev)}
            onChange={ev => this.handleTextInput(ev)}
            style={{ width: '400px', height: '38px', marginBottom: '16px' }}
            placeholder={'Search...'}
          />
        </div>
        {!booksLoading && (
          <Button
            onClick={() => this.handleSearch()}
            variant="primary"
            disabled={!this.state.query}
          >
            Search
          </Button>
        )}
        {booksLoading && (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Searching...
          </Button>
        )}
        <div>
          <input
            type="radio"
            name="searchOption"
            value="isbn"
            checked={this.state.searchOption === 'isbn'}
            onChange={() => this.handleRadioInput('isbn')}
          />{' '}
          ISBN
          <input
            type="radio"
            name="searchOption"
            value="bname"
            checked={this.state.searchOption === 'bname'}
            style={{ marginLeft: '16px' }}
            onChange={() => this.handleRadioInput('bname')}
          />{' '}
          Book Name
        </div>
      </div>
    );
  };

  render() {
    const {
      booksList = [],
      booksLoading,
      searched,
      booksError,
      booksErrorMessage
    } = this.props;

    return (
      <Container fluid>
        {this.renderSearchPanel()}
        {!booksLoading &&
          booksList.length > 0 && (
            <BooksList
              booksList={booksList}
              type={this.state.searchOption}
              query={this.state.query}
            />
          )}
        {!booksLoading &&
          searched &&
          booksList.length === 0 && (
            <div className="d-flex justify-content-center text-danger">
              No Result Found
            </div>
          )}
        {booksError && (
          <div className="d-flex justify-content-center text-danger m-4">
            {booksErrorMessage}
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ moduleStore = {} }) => ({
  booksLoading: moduleStore.booksLoading,
  booksList: moduleStore.booksList,
  searched: moduleStore.searched,
  booksError: moduleStore.booksError,
  booksErrorMessage: moduleStore.booksErrorMessage
});

export default connect(mapStateToProps, {
  searchBooks
})(SearchPanel);
