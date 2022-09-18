import { useState } from "react";

const SearchForm = ({ handleSearch }) => {
	const [searchInput, setSearchInput] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!searchInput.length) {
			return;
		}

		handleSearch(searchInput);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Enter address here!"
				onChange={(e) => setSearchInput(e.target.value)}
				value={searchInput}
			/>
			<button>Search</button>
		</form>
	);
};

export default SearchForm;
