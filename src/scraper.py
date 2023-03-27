import requests
from bs4 import BeautifulSoup

# Replace this with the URL of the article you want to scrape
url = "https://www.forbes.com/sites/richardnieva/2023/03/10/google-peacetime-ceo-sundar-pichai/?sh=6a508d4c4ab1"

# Send a GET request to the URL and get the HTML content
response = requests.get(url)
html_content = response.content

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(html_content, "html.parser")

# Find the main text of the article (usually inside a <div> or <article> tag)
article_text = ""
article_main = soup.find("div", {"class": "article-main"})
if article_main:
    for paragraph in article_main.find_all("p"):
        article_text += paragraph.text + "\n"
else:
    article_main = soup.find("article")
    if article_main:
        for paragraph in article_main.find_all("p"):
            article_text += paragraph.text + "\n"

# Print the scraped article text
print(article_text)