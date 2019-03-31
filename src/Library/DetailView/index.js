import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBookDetail } from '../../reducers/action';
import { Container, Spinner, Row, Col } from 'react-bootstrap';

class DetailView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getBookDetail(
      {
        bibkeys: `ISBN:${this.props.match.params.id}`,
        format: 'json',
        jscmd: 'data'
      },
      this.props.match.params.id
    );
  }

  /**
   * Render left panel
   */
  renderLeftPanel = bookDetail => {
    if (bookDetail.cover) {
      return (
        <Col
          md={6}
          className="bg-light d-flex justify-content-center align-items-center"
        >
          <img
            style={{ height: '400px' }}
            src={bookDetail.cover && bookDetail.cover.large}
            alt="Image not found"
          />
        </Col>
      );
    }

    return (
      <Col
        md={6}
        className="bg-light d-flex justify-content-center align-items-center"
      >
        <div
          style={{
            height: '400px',
            width: '200px',
            backgroundColor: '#ededed'
          }}
          className="d-flex justify-content-center align-items-center border"
        >
          Preview Not Available
        </div>
      </Col>
    );
  };

  /**
   * Render right panel
   */
  renderRightPanel = bookDetail => {
    return (
      <Col md={6} className="" style={{ padding: '16px' }}>
        <h4>{bookDetail.title}</h4>
        <div className="text-info">{bookDetail.subtitle}</div>
        <div style={{ marginTop: '16px' }}>
          <label className="text-muted">Author:</label>
          <span style={{ marginLeft: '16px' }}>
            {(bookDetail.authors && bookDetail.authors[0].name) || 'N/A'}
          </span>
        </div>
        <div style={{ marginTop: '16px' }}>
          <label className="text-muted">Publisher:</label>
          <span style={{ marginLeft: '16px' }}>
            {(bookDetail.publishers && bookDetail.publishers[0].name) || 'N/A'}
          </span>
        </div>
        <div style={{ marginTop: '16px' }}>
          <label className="text-muted">Published Date:</label>
          <span style={{ marginLeft: '16px' }}>
            {bookDetail.publish_date || 'N/A'}
          </span>
        </div>
        <div style={{ marginTop: '16px' }}>
          <label className="text-muted">Weight:</label>
          <span style={{ marginLeft: '16px' }}>
            {bookDetail.weight || 'N/A'}
          </span>
        </div>
        <div style={{ marginTop: '16px' }}>
          <a href={bookDetail.url} target="_blank">
            View in OpenLibrary
          </a>
        </div>
      </Col>
    );
  };

  render() {
    const {
      bookDetail = {},
      bookDetailLoading,
      bookDetailError,
      bookDetailErrorMessage
    } = this.props;
    return (
      <div>
        {bookDetailLoading && (
          <Container
            fluid
            style={{ height: '75vh' }}
            className="bg-light d-flex justify-content-center align-items-center"
          >
            <Spinner
              animation="border"
              role="status"
              style={{ height: '48px', width: '48px' }}
            />
          </Container>
        )}
        {!bookDetailLoading &&
          !bookDetailError &&
          Object.keys(bookDetail).length > 0 && (
            <Container fluid>
              <Row style={{ height: 'calc(100vh - 56px)' }}>
                {this.renderLeftPanel(bookDetail)}
                {this.renderRightPanel(bookDetail)}
              </Row>
            </Container>
          )}
        {bookDetailError && (
          <div className="d-flex justify-content-center text-danger m-4">
            {bookDetailErrorMessage}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ moduleStore = {} }) => ({
  bookDetailLoading: moduleStore.bookDetailLoading,
  bookDetail: moduleStore.bookDetail,
  bookDetailError: moduleStore.bookDetailError,
  bookDetailErrorMessage: moduleStore.bookDetailErrorMessage
});

export default connect(mapStateToProps, {
  getBookDetail
})(DetailView);
