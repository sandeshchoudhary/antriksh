import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { history } from '../../store';

class BooksList extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Render table body
   */
  renderTableBody = (books, type) => {
    return books.map((item, index) => {
      return (
        <tr key={index} style={{ cursor: 'pointer' }}>
          <td>{index + 1}</td>
          <td
            onClick={() =>
              item.isbn && history.push(`/library/${item.isbn[0]}`)
            }
            style={{ color: item.isbn ? '#0070DD' : 'gray', fontWeight: '500' }}
          >
            {item.title}
          </td>
          {type === 'bname' && (
            <td>{item.author_name && item.author_name[0]}</td>
          )}
          {type === 'isbn' && <td>{item.authors && item.authors[0].name}</td>}
          {type === 'bname' && <td>{item.publisher && item.publisher[0]}</td>}
          {type === 'isbn' && (
            <td>{item.publishers && item.publishers[0].name}</td>
          )}
        </tr>
      );
    });
  };

  render() {
    const { booksList = [], type } = this.props;

    return (
      <Container fluid style={{ maxHeight: '75vh', overflow: 'auto' }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th />
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
            </tr>
          </thead>
          <tbody>{this.renderTableBody(booksList, type)}</tbody>
        </Table>
      </Container>
    );
  }
}
export default BooksList;
