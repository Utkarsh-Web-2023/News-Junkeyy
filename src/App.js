import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./navbar";
import NewsComponent from "./news";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [progress, setProgress] = useState(0);
  const apiKey = "601bee97236d4f4cb08f31473e6cb786"
   // Access environment variable

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div>
        <LoadingBar
          color='#007bff'
          shadow={true}
          height='2.5px'
          transitionTime={300}
          loaderSpeed={600}
          waitingTime={1000}
          progress={progress} // Access progress from state
        />
        <Navbar
          onSearchChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />
        <Routes>
          {/* Pass apiKey as prop to NewsComponent */}
          <Route path="/" element={<NewsComponent apiKey={apiKey} setProgress={setProgress} key="general" pageSize={12} country="in" category="general" searchQuery={searchQuery} />} />
          <Route path="/entertainment" element={<NewsComponent apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={18} country="in" category="entertainment" searchQuery={searchQuery} />} />
          <Route path="/health" element={<NewsComponent apiKey={apiKey} setProgress={setProgress} pageSize={9} key="health" country="in" category="health" searchQuery={searchQuery} />} />
          <Route path="/business" element={<NewsComponent apiKey={apiKey} setProgress={setProgress} pageSize={18} key="business" country="in" category="business" searchQuery={searchQuery} />} />
          <Route path="/science" element={<NewsComponent apiKey={apiKey} setProgress={setProgress} pageSize={12} country="in" key="science" category="science" searchQuery={searchQuery} />} />
          <Route path="/sports" element={<NewsComponent apiKey={apiKey} setProgress={setProgress} pageSize={15} country="in" key="sports" category="sports" searchQuery={searchQuery} />} />
          <Route path="/tech" element={<NewsComponent apiKey={apiKey} setProgress={setProgress} pageSize={18} country="in" key="technology" category="technology" searchQuery={searchQuery} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
