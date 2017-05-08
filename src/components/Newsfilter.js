import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FirebaseAuth from './FirebaseAuth';
import * as firebase from 'firebase';
import axios from 'axios';

class Newsfilter extends Component {

  constructor() {
    super();
    this.state = {
      news: [],
      theSource: {},
      filter: ''
    };
  }

  componentWillMount() {
    console.log(this.props.match.params.source);
    let url = 'https://newsapi.org/v1/articles?source=' + this.props.match.params.source + '&sortBy=' + this.props.match.params.filter + '&apiKey=213327409d384371851777e7c7f78dfe';
    axios.get(url)
    .then((response) => {
       this.setState({
        news: response.data.articles,
        theSource: response.data,
        filter: this.props.match.params.filter
      });
       console.log(response.data.articles);
    })
    .catch((error) => {
      window.location.href= '/';
    });
  }

  render() {
    const url = '/newsfilter/' + this.state.theSource.source + '/';
    var firebaseObj = new FirebaseAuth;
    let favButton = null;
    let favouriteButton = null;

    const { news } = this.state;
    const NewsDetail = news.map((newsname) => {
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
    return (
     <div>
      <FirebaseAuth />
      <h1>{this.state.theSource.source} <small>(filtered by {this.state.filter})</small></h1>
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

export default Newsfilter;
