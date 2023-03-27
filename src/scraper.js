// /* JS parsing script to parse articles using jssoup*/
// // const fetch = require('node-fetch');
// var JSSoup = require('jssoup').default;

// const scrapeArticle = async (url) => {
//   try {
//     const response = await fetch('https://cors-anywhere.herokuapp.com/' + url, { mode: 'cors' }); //fetching the article using a cors proxy
//     const html = await response.text();
//     const soup = new JSSoup(html); //making soup

//     // Use JSSoup to select the article content element(s) and extract the text
//     const article = soup.findAll("p"); //everything within paragraph tags
//     console.log(article.toString());
//     const articleText = article ? article.text : '';

//     return articleText;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// module.exports = scrapeArticle;
