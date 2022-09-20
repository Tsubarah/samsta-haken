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
		<form onSubmit={handleSubmit} className="flex gap-2">
			<input
				type="text"
				placeholder="Enter address here!"
				onChange={(e) => setSearchInput(e.target.value)}
				value={searchInput}
				className="input input-sm"
			/>
			<button className="btn btn-sm">Search</button>
		</form>
	);
};

export default SearchForm;
