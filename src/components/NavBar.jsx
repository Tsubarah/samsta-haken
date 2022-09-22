import { useAuthContext } from "../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

import SearchForm from "./SearchForm";
import { HiOutlinePencil } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";

const NavBar = () => {
	const { showTips, setShowTips, drawerIsOpen, setDrawerIsOpen } = useAuthContext();

	const urlLocation = useLocation();

	const hidden = classNames(urlLocation.pathname !== "/" ? "hidden" : "");

	return (
		<>
			{/* Mobile view */}
			<div className="navbar bg-base-100 px-4 lg:hidden">
				{/* Search bar */}
				<SearchForm className={"w-full"} />
			</div>

			{/* Desktop view */}
			<div className="navbar bg-base-100 hidden lg:grid grid-cols-12">
				<Link to={"/"}>
					<h1 className="btn btn-ghost normal-case text-xl col-span-2">
						Sämsta Haken
					</h1>
				</Link>
				<button className="col-start-3" onClick={() => setDrawerIsOpen(!drawerIsOpen)}>click</button>
				<SearchForm className={`w-full col-start-5 col-end-11 ${hidden}`} />

				<button
					className={`col-start-11 justify-self-end gap-2 ${hidden}`}
					onClick={() => setShowTips(!showTips)}
				>
					<HiOutlinePencil size={25} />
					<span className="btm-nav-label">Tipsa</span>
				</button>

				<div className="dropdown dropdown-end col-start-12 justify-self-center">
					<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
						<AiOutlineUser size={25} />
					</label>
					<ul
						tabIndex={0}
						className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
					>
						<li>
							<Link to="/login" className="justify-between">
								Logga in
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default NavBar;
