import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, destinations }) => {
  const [query, setQuery] = useState('');
  const [hasSelection, setHasSelection] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // If the query changes, we're no longer in a "selected" state
    if (hasSelection) {
      setHasSelection(false);
    }
  };

  const filteredDestinations = Object.keys(destinations).filter(name =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSuggestionClick = (name) => {
    setQuery(name);
    setHasSelection(true);
    onSearch(name);
  };

  return (
    <div className={`search-bar ${hasSelection ? 'has-selection' : ''}`}>
      <span className="search-icon"></span>
      <input
        type="text"
        placeholder="🔍 Search for travel, destinations, and more..."
        value={query}
        onChange={handleChange}
      />
      {query && !hasSelection && (
        <div className="search-dropdown">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((name) => (
              <div 
                key={name} 
                className="dropdown-item" 
                onClick={() => handleSuggestionClick(name)}
              >
                {highlightMatch(name.split(' (')[0], query)}
              </div>
            ))
          ) : (
            <div className="dropdown-item no-results">No destinations found</div>
          )}
        </div>
      )}
    </div>
  );
};

// Helper function to highlight the matching part of the text
const highlightMatch = (text, query) => {
  if (!query) return text;
  
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;
  
  const before = text.substring(0, index);
  const match = text.substring(index, index + query.length);
  const after = text.substring(index + query.length);
  
  return (
    <>
      {before}<span className="highlight">{match}</span>{after}
    </>
  );
};

export default SearchBar;