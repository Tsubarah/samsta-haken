import { useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

const SearchForm = ({ className, handleSearch, handleCurrentLocation }) => {
	const [searchInput, setSearchInput] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!searchInput.length) {
			return;
		}

		handleSearch(searchInput);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={`flex justify-center items-center ${className}`}
		>
			<TiLocationArrow
				onClick={handleCurrentLocation}
				size={25}
				className="cursor-pointer"
			/>
			<input
				type="text"
				placeholder="Enter address here!"
				onChange={(e) => setSearchInput(e.target.value)}
				value={searchInput}
				className="input input-sm mr-2"
			/>

			<button className="btn btn-sm">Search</button>
		</form>
	);
};

export default SearchForm;
