import { useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { BiSearch } from "react-icons/bi";

const SearchForm = ({ className, handleSearch, handleCurrentLocation }) => {
	const [searchInput, setSearchInput] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!searchInput.length) {
			return;
		}

		handleSearch(searchInput);
		setSearchInput("");
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

			<div className="input-group">
				<input
					type="text"
					placeholder="Enter address here!"
					onChange={(e) => setSearchInput(e.target.value)}
					value={searchInput}
					className="input input-sm"
				/>

				<button className="btn btn-sm btn-square">
					<BiSearch size={20} />
				</button>
			</div>
		</form>
	);
};

export default SearchForm;
