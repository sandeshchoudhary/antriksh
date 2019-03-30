import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Navbar, Table, ModalTitle } from 'react-bootstrap';
import { Route, Switch, Link } from 'react-router-dom';
import {history} from '../../store';


class BooksList extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  /**
   * Render table body
   */
  renderTableBody = books => {
    return books.map((item, index) => {
      return (
        <tr key={index} style={{cursor: 'pointer'}}>
          <td>{index + 1}</td>
          <td onClick={() => history.push(`/library/${item.isbn[0]}`)}
            style={{color: '#0070DD', fontWeight: '500'}}>
            {item.title}
          </td>
          <td>{item.author_name && item.author_name[0]}</td>
          <td>{item.publisher && item.publisher[0]}</td>
        </tr>
      )
    })
  }

  render() {
    const {booksList = []} = this.props;

    return (
      <Container fluid style={{maxHeight: '75vh', overflow: 'auto'}}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableBody(booksList)}
          </tbody>
        </Table>
      </Container>
    );
  }
}

// const mapStateToProps = ({ moduleStore = {} }) => ({
//   booksLoading: moduleStore.booksLoading,
//   booksList: moduleStore.booksList
// });

// export default connect(mapStateToProps, {
//   searchBooks
// })(SearchPanel);
export default BooksList;