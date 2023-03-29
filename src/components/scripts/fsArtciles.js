const promises = selectedTopics.map(async (topic) => {
    try {
      const link = await getNewsArticles(topic);
      console.log(link.url[0])
      const summary = await OpenAI(link.url[0]);
      urlList.push(link.url[0]); // add url to urlList array
      //add article to firebase
      const articlesRef = collection(db, "articles");
      const newArticleRef = doc(articlesRef);
      // set the data for the new document
      await setDoc(newArticleRef, {
        url: link.url[0],
        summary: summary.text,
        likes: 0,
        title: topic
      });
    } catch (error) {
      console.error(`Error scraping article ${error}`);
    }
  });
  // Wait for all promises to resolve
  await Promise.all(promises);