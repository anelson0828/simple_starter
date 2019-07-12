import React, { Component } from 'react';
import { Grid, Input, Pagination, Segment } from 'semantic-ui-react';

export default class PaginationBar extends Component {
  state = { activePage: 1, totalPages: 1 };

  handleInputChange = (e, { value }) => this.setState({ activePage: value });

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

  render() {
    const { activePage, totalPages } = this.state;

    return (
      <Pagination
        activePage={activePage}
        onPageChange={this.handlePaginationChange}
        totalPages={totalPages}
      />
    );
  }
}
