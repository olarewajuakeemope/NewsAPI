import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NewsStore from '../stores/NewsStore';
import SourceList from './SourceList';
import * as NewsActions from "../actions/NewsActions";
import axios from 'axios';

class News extends Component {

  constructor() {
    super();
    this.state = {
      news: [],
    };
  }

  componentWillMount() {
    NewsActions.getNewsSources();
    NewsStore.on('sourceList', this.getNews.bind(this));
  }

getNews(){
  this.setState({
    news: NewsStore.getAll()
  });
  console.log('in the getnews method');
}

  render() {
    console.log(this.state.news);
    const { news } = this.state;
    const NewsList = news.map((newsname) => {
      let url = '/newslisting/' + newsname.id;
      return <SourceList key={newsname.id} sorts={newsname.sortBysAvailable} url={url} name={newsname.name}/>
    });
    return (
      <div>
        <h1>News Sites</h1>
        <ul className='list-group'>
        {NewsList}
        </ul>
      </div>
    );
  }
}

export default News;
