import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full flex justify-end mb-4">
      <div className="flex flex-col items-start w-full sm:w-1/3">
        <label htmlFor="search" className="mb-1 font-semibold text-gray-700">
          Search:
        </label>
        <input
          type="text"
          id="search"
          placeholder="Start your search with a keyword, name, email, etc..."
          className="w-full p-2 border border-gray-200 focus:ring-0 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
