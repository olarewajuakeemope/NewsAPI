const Request = require('superagent');

class Api {
  getSources() {
    const url = 'https://newsapi.org/v1/sources?language=en';
    return Request.get(url).then((res) => {
      const b = JSON.parse(res.text);
      return b.sources;
    }, () => {
      console.log('search failed');
    });
  }
  getNews(source = '', sort = '') {
    const apikey = '213327409d384371851777e7c7f78dfe';
    const url = `https://newsapi.org/v1/articles?source=${source}&sortBy=${sort}&apiKey=${apikey}`;
    return Request.get(url).then((res) => {
      const news = JSON.parse(res.text);
      return news.articles;
    }, () => ('error occured'));
  }
}
const api = new Api();
export default api;
