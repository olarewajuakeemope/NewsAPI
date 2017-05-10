import React, { Component } from 'react';
import NewsStore from '../stores/NewsStore';
import Share from '../share/Share';
import * as firebase from 'firebase';
import FirebaseAuth from './FirebaseAuth';

class Favourites extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
    };
  }

  componentWillMount() {
    let articlesArray = [];
    let test = 1;
    firebase.database().ref('/favourites/' + this.props.match.params.user).once('value').then((snapshot) => {
      var articles = snapshot.val();
        Object.keys(articles).forEach((postId) => {
        var post = articles[postId];
        articlesArray.push(post);
      });
    this.setState({
     articles: articlesArray,
    });
    });

    console.log(this.state);
    console.log(articlesArray);
    console.log(this.state.articles);
  }

  fetchFavourites() {
    console.log('Got here');
    this.setState({
      bar: Date.now()
    });
    console.log(this.state);
  }

  render() {

        const ArticlesDetail = this.state.articles.map((detail) => {
        return <div className='panel panel-default' key={detail.url}>
                <div className='panel-body'>
                 <div className='panel-heading'>
                  <h3>{detail.title}</h3>
                 </div>
                 <div className='col-sm-3 thumbnail'>
                   <img src={detail.urlToImage} />
                </div>
                <div className='col-sm-9'>
                 <p><strong>source:</strong> {detail.source}</p>
                 <p>{detail.description}</p>
                 <button className='btn btn-small btn-default'><a href={detail.url} target='_blank'>Read More</a></button>
                <div>
                  <span className="share">Share via</span>
                  <Share share={detail.url} title= {detail.title} />
                </div> 
               </div>                             
              </div>
            </div>
      });
    return (
      <div>
      {this.fetchFavourites.bind(this)}
      <FirebaseAuth />
      <div className='container'>
       <div className='panel-group'>
         {ArticlesDetail}
         </div>
        </div>
      </div>
    );
  }
}

export default Favourites;
