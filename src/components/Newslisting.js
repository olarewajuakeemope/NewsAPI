import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FirebaseAuth from './FirebaseAuth';
import * as firebase from 'firebase';
import * as NewsActions from "../actions/NewsActions";
import NewsStore from '../stores/NewsStore';
import axios from 'axios';

class Newslisting extends Component {

  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    console.log(this.props);
    if(this.props.defaultSource){
      NewsActions.getNewsList(this.props.defaultSource);
    }else{
      NewsActions.getNewsList(this.props.match.params.source);
    }
      NewsStore.on('newsList', this.getSourceNews.bind(this));
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

    if(!this.state.newsObj){
     NewsDetail = <h1>Loading...</h1>;
    }else{
      sourceHeader = <h1>{this.state.newsObj.source}</h1>;
      url = '/newsfilter/' + this.state.newsObj.source + '/';
      let firebaseObj = new FirebaseAuth;

    const { articles } = this.state.newsObj;
    NewsDetail = articles.map((newsname) => {
    if(firebaseObj.userExist()) {
      favButton = <button className='btn btn-small btn-default'><span onClick={() => {firebaseObj.addPost(firebase.auth().currentUser.uid, newsname)}}>Like</span></button>;
        favouriteButton = <button className='btn btn-small btn-default'><Link to={'/favourites/' + firebase.auth().currentUser.uid}>Favourites</Link></button>;
    }
        return <div key={newsname.url}>
                <h3>{newsname.title}</h3>
                <p><a href={newsname.author}>author</a></p>
                <h6><strong>Published at: </strong>{newsname.publishedAt}</h6>
                <img src={newsname.urlToImage} />
                <p>{newsname.description}</p>
                <button className='btn btn-small btn-default'><a href={newsname.url}>Read More</a></button>{favButton}
             </div>
    });
    }

    return (
     <div>
      {sourceHeader}
      {this.props.sorts}
      <span><strong>filter by </strong></span>
      <button className='btn btn-small btn-default'><Link to={url + 'top'}>top</Link></button>
      <button className='btn btn-small btn-default'><Link to={url + 'popular'}>popular</Link></button>
      <button className='btn btn-small btn-default'><Link to={url + 'latest'}>latest</Link></button>
      {favouriteButton}
      {NewsDetail}
     </div>
    );
  }
}

export default Newslisting;
