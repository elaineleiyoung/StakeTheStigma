/*This file contains our api requests to newsapi
in a separate file for organization purposes, but will combine into a single file with nhsApi later on*/
import scrapeArticle from './scraper.js';

export const getNewsArticles = async (topic) => {
    const subscriptionKey = '34aa0fb2a7a5422abd9a84309640d8f4'; //subscription key
    const url = 'https://newsapi.org/v2/everything?q=' + topic + '&sortBy=relevancy&apiKey=' + subscriptionKey; //api call searches for articles based on topic, sorted by relevancy
    const response = await fetch(url);
    const responseJson = await response.json();

    const articleUrls = responseJson.articles.slice(0, 5).map((article) => article.url);// takes the first 5 url's

    // Call scrapeArticle function to scrape article
    const scrapedArticles = [];
    async function scrapeArticles() {
    for (const url of articleUrls) {
        try {
        const article = await scrapeArticle('https://www.forbes.com/sites/richardnieva/2023/03/10/google-peacetime-ceo-sundar-pichai/?sh=6a508d4c4ab1'); //hard coded article url for debugging purposes
        // const article = await scrapeArticle(url);
        scrapedArticles.push(article);
        } catch (error) {
        console.error(`Error scraping article at ${url}: ${error}`);
        }
    }
    }

    scrapeArticles()
    .then(() => console.log(scrapedArticles))
    .catch((error) => console.error(`Error scraping articles: ${error}`));

    //TO-DO: integrate with dashboard correctly
    return {
      'url': articleUrls,
      // 'article': article // Add scraped article to response
    };
}
