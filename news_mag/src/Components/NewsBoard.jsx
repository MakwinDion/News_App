import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = "82be09170de0441784a7cc38edbbb360"; // Replace with your actual API key
    const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`;

    const fetchNews = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response:", data); // Log the API response

        if (data.articles) {
          // Ensure each article has a valid `urlToImage`
          const articlesWithImages = data.articles.map(article => {
            // Set a fallback image if `urlToImage` is missing or null
            const imageUrl = article.urlToImage || "https://via.placeholder.com/345x200?text=No+Image";
            return { ...article, urlToImage: imageUrl };
          });
          setArticles(articlesWithImages);
        } else {
          setError("No articles found.");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {loading ? (
        <p>Loading news...</p>
      ) : error ? (
        <p>{error}</p>
      ) : articles.length > 0 ? (
        <div className="d-flex flex-wrap justify-content-center">
          {articles.map((news, index) => (
            <NewsItem
              key={index}
              title={news.title}
              description={news.description}
              src={news.urlToImage} // Image source, with fallback applied
              url={news.url}
            />
          ))}
        </div>
      ) : (
        <p>No articles available.</p>
      )}
    </div>
  );
};

export default NewsBoard;
