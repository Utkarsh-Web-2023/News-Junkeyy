import React from "react";

const NewsItem = ({ title, description, imgUrl, newsUrl, author, date, source }) => {
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const defaultImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwrlq-F4qfbGg9--Z6W_jdDhjlRQTUSpxV4EV1trpzaA&s"; // Replace this with your desired default image URL

    const openUrlInNewTab = (url) => {
        // Check if the URL is provided
        if (!url) {
            console.error("URL is not provided");
            return;
        }

        // Open the URL in a new tab
        window.open(url, "_blank");
    };

    return (
        <div className="card news-card card-image-cover card-border" onClick={() => openUrlInNewTab(newsUrl)}>
            <div className="image-container">
                <div className="badge">{source.name}</div>
                <img src={imgUrl || defaultImageUrl} alt="" />
            </div>
            <div className="card-body">
                <h2 className="card-header">{title}</h2>
                <p className="text-content2">{description}</p>
                <div className="author-date">
                    <p className="author">By {!author ? "Unknown" : author}</p>
                    <p className="date">Published on {formatDate(date)}</p>
                </div>
                <div className="card-footer">
                    <a
                        href={newsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary btn news-btn"
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
