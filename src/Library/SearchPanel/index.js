import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {  } from '../reducers/action';
import { Button, Container, Row, Navbar, Spinner } from 'react-bootstrap';
import { Route, Switch, Link } from 'react-router-dom';
import {history} from '../../store';
import {searchBooks} from '../../reducers/action';
import BooksList from './BooksList';


class SearchPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchOption: 'bname'
    }
  }

  handleRadioInput = (value) => {
    this.setState({searchOption: value});
  }

  handleTextInput = event => {
    this.setState({query: event.target.value})
  }

  handleKeyPress = event => {
    if (event.key === 'Enter' && this.state.query) {
      this.handleSearch();
    }
  }

  handleSearch = () => {
    const {searchBooks} = this.props;
    const {query, searchOption} = this.state;
    if (searchOption === 'bname') {
      searchBooks({q: query}, 'bname');
    } else {
      searchBooks({
        bibkeys: `ISBN:${query}`,
        format:'json',
        jscmd: 'data'
      }, 'isbn')
    }
  }

  render() {
    const {booksList = [], booksLoading} = this.props;

    return (
      <Container fluid>
        <div style={{padding: '32px', textAlign: 'center'}}>
          <h4>Explore Books Here</h4>
          <div>
            <input type="text"
              onKeyPress={ev => this.handleKeyPress(ev)}
              onChange={ev => this.handleTextInput(ev)} style={{width: '400px', height: '38px', marginBottom: '16px'}}
              placeholder={'Search...'} />
          </div>
          {!booksLoading && (
              <Button onClick={() => this.handleSearch()} variant="primary"
                disabled={!this.state.query}>
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
            {/* <input type="radio" name="searchOption" value="isbn" checked={this.state.searchOption === 'isbn'}
              onClick={() => this.handleRadioInput('isbn')}/> ISBN */}
            <input type="radio" name="searchOption" value="bname" checked={this.state.searchOption === 'bname'}
              style={{marginLeft: '16px'}}
              onClick={() => this.handleRadioInput('bname')} /> Book Name
          </div>
        </div>
        {!booksLoading && booksList.length > 0 && (
          <BooksList booksList={booksList} />
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ moduleStore = {} }) => ({
  booksLoading: moduleStore.booksLoading,
  booksList: moduleStore.booksList
});

export default connect(mapStateToProps, {
  searchBooks
})(SearchPanel);
