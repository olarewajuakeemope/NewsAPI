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
  	switch(action.type) {
  		case 'CREATE_NEWS': {
        this.news = action.data;
        this.emit('sourceList');
        break;
  		}
      case 'NEWS_LIST': {
        this.newsListing = action.data;
        this.emit('newsList');
        break;
      }
      case 'NEWS_FILTER': {
        this.newsListing = action.data;
        this.emit('filterList');
        break;
      }
      default: {

      }
  	}

  }
}

const newsStore = new NewsStore;
dispatcher.register(newsStore.handleActions.bind(newsStore));

export default newsStore;