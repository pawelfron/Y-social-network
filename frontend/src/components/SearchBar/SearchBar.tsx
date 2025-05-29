import React, { useState } from 'react';
import './SearchBar.css'; 
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="searchBarWrapper">
      <Search size={20} className="searchIcon" />
      <input
        type="text"
        className="searchInput"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
