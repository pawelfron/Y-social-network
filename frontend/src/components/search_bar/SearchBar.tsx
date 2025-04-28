import React from 'react';
import './SearchBar.css'; 
import {Search} from "lucide-react";

const SearchBar = () => {
  return (
    <div className="searchBarWrapper">
      <Search size={20} />
      <input type="text" className="searchInput" placeholder="Search..." />
    </div>
  );
}

export default SearchBar;
