import { IoMdSearch } from 'react-icons/io';

const SearchBar = ({ onSubmit }) => {
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" className="SearchForm-button">
          <IoMdSearch size={24} />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          name="searchImage"
          autoFocus
          // autoComplete="off"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default SearchBar;
