import SearchForm from "./SearchForm";
import { HiDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<div className="navbar bg-base-100 px-4">
			{/* Search bar */}
			<SearchForm className={"w-full"} />
		</div>
	);
};

export default NavBar;
