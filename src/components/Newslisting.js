import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FirebaseAuth from './FirebaseAuth';
import * as firebase from 'firebase';
import * as NewsActions from "../actions/NewsActions";
import NewsStore from '../stores/NewsStore';
import Share from '../share/Share';
import axios from 'axios';

class Newslisting extends Component {

  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
      NewsActions.getNewsList(this.props.match.params.source);
      NewsStore.on('newsList', this.getSourceNews.bind(this));
      NewsStore.on('filterList', this.getSourceNews.bind(this));
  }

  getSourceNews(){
    console.log('in the newsListing method top', this.state);
   this.setState({
    newsObj: NewsStore.getNewsListing()
   });
   console.log('in the newsListing method');
  }

  render() {
    let url = '';
    let favButton = '';
    let favouriteButton = '';
    let NewsDetail = '';
    let sourceHeader = '';
    let sortButtons = '';

    if(!this.state.newsObj){
     NewsDetail = <h1>Loading...</h1>;
    }else{
      sourceHeader = <h1>{this.state.newsObj.source}</h1>;
      let firebaseObj = new FirebaseAuth;
      
      let sortArray = this.props.match.params.sorts.split('+');
      sortButtons = sortArray.map((sortValue) => {
         return <button className='btn btn-small btn-default' onClick={() => {NewsActions.getFilter(this.props.match.params.source, sortValue)}}>{sortValue}</button>
      });

    const { articles } = this.state.newsObj;
    NewsDetail = articles.map((newsname) => {
    if(firebaseObj.userExist()) {
      favButton = <button className='btn btn-small btn-default'><span onClick={() => {firebaseObj.addPost(firebase.auth().currentUser.uid, newsname, this.state.newsObj)}}>Like</span></button>;
    }
        return <div className='row' key={newsname.url}>
                 <div className='col-sm-3 thumbnail'>
                  <img src={newsname.urlToImage} />
                </div>
                <div className='col-sm-9'>
                  <h3>{newsname.title}</h3>
                <p><a href={newsname.author}>author</a></p>
                <h6><strong>Published at: </strong>{newsname.publishedAt}</h6>
                <p>{newsname.description}</p>
                <button className='btn btn-small btn-default'><a href={newsname.url} target='_blank'>Read More</a></button>{favButton}
                <div>
                  <span className="share">Share via</span>
                  <Share share={newsname.url} title= {newsname.title} />
                </div>    
                </div>
               </div>
    });
    }

    return (
     <div>
      <FirebaseAuth />
     <div className='container'>
      {sourceHeader}
      {this.props.sorts}
      <span><strong>filter by </strong></span>
      {sortButtons}
      </div>
     <div className='container'>
      {NewsDetail}
     </div>
     </div>
    );
  }
}

export default Newslisting;
