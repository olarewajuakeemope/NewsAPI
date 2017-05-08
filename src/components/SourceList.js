import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SourceList extends Component {

  render() {
    return (
      <li className='list-group-item'><Link to={this.props.url}>{this.props.name}</Link></li>

    );
  }
}

export default SourceList;
