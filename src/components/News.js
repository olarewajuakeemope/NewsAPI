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

searchSources(e) {
    e.preventDefault();
    let filterlist = [];
    const query = e.target.value;
    filterlist = NewsStore.getAll().filter((source) => {
      if (source.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        return source;
      }
    });
    this.setState({
      news: filterlist
    });
}

  render() {

    const { news } = this.state;
    const NewsList = news.map((newsname) => {
      let sortArrayString = newsname.sortBysAvailable.toString();
      let commaChanged = sortArrayString.replace(',','+');
      let url = '/newslisting/' + newsname.id + '/' + commaChanged;
      
      return <SourceList key={newsname.id} sorts={newsname.sortBysAvailable} url={url} name={newsname.name}/>
    });
    return (
      <div>
        <div className='container'>
         <div className='row'>
          <div className='col-sm-4 col-sm-offset-4'>
          <h1 className='text-center'>News Sites</h1>
           <input type='text' className='form-control' onChange={this.searchSources.bind(this)} placeholder='Search for sources..' title='Type in a search' />
           <p></p>
          </div>
         </div>
       </div>  
        <ul className='list-group'>
        {NewsList}
        </ul>
      </div>
    );
  }
}

export default News;
