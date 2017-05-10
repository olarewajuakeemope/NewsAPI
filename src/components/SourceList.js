import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SourceList extends Component {

  render() {
    return (
      <li className='list-group-item'><Link to={this.props.url} style={{ textDecoration: 'none' }}><span className='reactlink'>{this.props.name}</span></Link></li>

    );
  }
}

export default SourceList;
