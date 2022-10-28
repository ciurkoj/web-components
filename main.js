import './news-article.js';
import './news-article-list.js';


const apiKey = '39bf5420207e40b69da312041255892a';
const topHeadlinesUrl =
  'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey;


  window.addEventListener('load', () => {
    getArticles();
  });

const newsArticleList = document.getElementById('news-article-list');
const add = document.querySelector('.add');

var articles = [];
var index = 0;

async function getArticles(){
    const res = await fetch(topHeadlinesUrl);
    const json = await res.json();  
    articles= json.articles;
  }
  

add.onclick = function() {
    try {
      for(let i=index; i<index+10;i++){

        newsArticleList.add = articles[i];
      }
    } catch (error) {
      alert("Sorry, no new articles. Please visit us later")
    }
    index+=10;
  };

