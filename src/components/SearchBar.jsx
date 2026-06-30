import { useState } from "react";
import "../css/SearchBar.css";

function SearchBar({ onSearch }) {
    const [searchText, setSearchText] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;

        setSearchText(value);

        onSearch(value);
    };

    return (
        <input
            type="text"
            placeholder="🔍 Search Files..."
            value={searchText}
            onChange={handleChange}
            style={{
                width: "93%",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "5px",
                border: "1px solid gray",
                marginRight: "100px"
            }}
        />
    );
}

export default SearchBar;