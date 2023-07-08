import React from "react";
const SearchBar = {search, handleSearch} => {
    return (
        <>
        <input
        className= "searching"
        type="text"
        value={search}
        onchange={handleSearch}
        placeholder="Search by name, emailid and role"

        />
        </>
    );
};
export default SearchBar;