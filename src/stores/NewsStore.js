import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/Dispatcher';


class NewsStore extends EventEmitter {

  constructor() {
  	super();
       this.news = [];
       this.newsListing = {};
  }

  getAll() {
    return this.news;
  }

 getNewsListing() {
  console.log('in getnewlisting sotre method', this.newsListing);
    return this.newsListing;
  }

  giv(data) {
    this.news = data;
    return this.news;
  }

  createNews(uid, url) {
    this.emit('change');
  }

  handleActions(action) {
  	//console.log('action recieved in newsStore', action);
  	switch(action.type) {
  		case 'CREATE_NEWS': {
        this.news = action.data;
        this.emit('sourceList');
  		}
      case 'NEWS_LIST': {
        this.newsListing = action.data;
        this.emit('newsList');
      }
      case 'NEWS_FILTER': {
        this.newsListing = action.data;
        this.emit('filterList');
      }
  	}

  }
}

const newsStore = new NewsStore;
dispatcher.register(newsStore.handleActions.bind(newsStore));

export default newsStore;