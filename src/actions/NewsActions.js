import dispatcher from '../dispatcher/Dispatcher';
import axios from 'axios';

export function getNewsSources() {
	axios.get('https://newsapi.org/v1/sources?language=en')
  	.then((response) => {
       dispatcher.dispatch({
		type: 'CREATE_NEWS',
		data: response.data.sources,
	 }); 
  	});
}

export function getNewsList(source) {
	const url = 'https://newsapi.org/v1/articles?source=' + source + '&apiKey=213327409d384371851777e7c7f78dfe';
	axios.get(url)
  	.then((response) => {
       dispatcher.dispatch({
		type: 'NEWS_LIST',
		data: response.data,
	 }); 
  	});
}

export function getFilter(source, newFilter) {
	const url = 'https://newsapi.org/v1/articles?source=' + source + '&sortBy=' + newFilter + '&apiKey=213327409d384371851777e7c7f78dfe';
	axios.get(url)
  	.then((response) => {
       dispatcher.dispatch({
		type: 'NEWS_FILTER',
		data: response.data,
	 }); 
  	}); 
}