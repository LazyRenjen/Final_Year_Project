import './SearchBar.css'

const SearchBar = () => {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input 
        type="text" 
        placeholder="Search for travel, destinations, and more..."
      />
    </div>
  );
};

export default SearchBar;

