import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./newsItm";
import "./style.css";

const capitalize = (str) => {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const NewsComponent = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [allDataLoaded, setAllDataLoaded] = useState(false); // Added state to track if all data is loaded

  useEffect(() => {
    fetchNews();
  }, [props.searchQuery]);

  const fetchNews = async (page = 1) => {
    try {
      setLoading(true);
      const apiKey = props.apiKey;
      props.setProgress(20)
      let url;
      const { country, category, pageSize, searchQuery } = props;
      if (searchQuery && searchQuery.length >= 3) {
        url = `https://newsapi.org/v2/everything?q="${searchQuery}"&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      }
      props.setProgress(25)

      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Failed to fetch news');
      }
      props.setProgress(30)

      const data = await response.json();
      props.setProgress(60)

      setArticles(data.articles);
      setLoading(false);
      setPage(page);
      setTotalResults(data.totalResults);
      setAllDataLoaded(articles.length + data.articles.length === data.totalResults); // Update allDataLoaded state
      props.setProgress(100)

    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  }

  const fetchMoreData = async() => {
    try {
      setLoading(true);
      const apiKey = props.apiKey;
      let url;
      const { country, category, pageSize, searchQuery } = props;
      if (searchQuery && searchQuery.length >= 3) {
        url = `https://newsapi.org/v2/everything?q="${searchQuery}"&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      setArticles(prevArticles => [...prevArticles, ...data.articles]);
      setLoading(false);
    setPage(page + 1);

      setTotalResults(data.totalResults);
      setAllDataLoaded(articles.length + data.articles.length === data.totalResults); // Update allDataLoaded state
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  }

  const hasMoreArticles = articles.length !== totalResults && !allDataLoaded; // Check if all data is loaded

  return (
    <div className="news-container">
      <h1 className="heading">
        News Junkeyy - Top {capitalize(props.category)} Headlines
      </h1>
      {loading && <div className="loader"></div>}
      {totalResults === 0 && !loading ? (
        <h2 className="no-results-heading">No results found</h2>
      ) : (
        <div className="news-wrapper">
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={hasMoreArticles}
            loader={hasMoreArticles && !allDataLoaded && <div className="loader"></div>} // Show loader only if more data is available
            className="news"
          >
            {articles.map((element) => (
              <NewsItem
                key={element.url}
                imgUrl={element.urlToImage}
                title={element.title}
                description={element.description || ""}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source}
              />
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}

NewsComponent.propTypes = {
  apiKey: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  searchQuery: PropTypes.string
};

export default NewsComponent;
