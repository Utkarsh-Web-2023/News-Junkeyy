import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onSearchChange, onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      onSearchChange(query);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchQuery);
  };

  return (
    <div className="navbar navbar-sticky navbar-bordered navbar-glass navbar-primary">
      <div className="navbar-start">
        <Link className="navbar-item" to="/">News Junkeyy</Link>
      </div>
      <div className="navbar-center">
        <Link className="navbar-item" to="/">Home</Link>
        <Link className="navbar-item" to="/business">Business</Link>
        <Link className="navbar-item" to="/entertainment">Entertainment</Link>
        <Link className="navbar-item" to="/health">Health</Link>
        <Link className="navbar-item" to="/science">Science</Link>
        <Link className="navbar-item" to="/sports">Sports</Link>
        <Link className="navbar-item" to="/tech">Technology</Link>
      </div>
      <div className="navbar-end">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="submit" disabled={searchQuery.length < 3} className="search-button">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
