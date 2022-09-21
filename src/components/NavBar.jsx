import SearchForm from "./SearchForm";
import { HiDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className="navbar bg-base-100 grid grid-cols-12 z-10 px-2">
			{/* Search bar */}
			<SearchForm className={"col-span-11"} />

			{/* Drop down menu */}
			<div className="flex-none col-start-12 justify-self-end dropdown dropdown-end">
				<button
					className="btn btn-square btn-ghost btn-sm"
					tabIndex={0}
					onClick={() => {
						setShowMenu(!showMenu);
					}}
				>
					<HiDotsHorizontal size={25} />
				</button>

				{showMenu && (
					<ul className="p-2 bg-base-100 dropdown-content menu">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
					</ul>
				)}
			</div>
		</div>
	);
};

export default NavBar;
