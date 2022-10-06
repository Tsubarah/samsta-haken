import { useAuthContext } from "../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

import SearchForm from "./SearchForm";
import { HiOutlinePencil } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineUser, AiOutlineUnorderedList } from "react-icons/ai";

const NavBar = () => {
	const {
		showTips,
		setShowTips,
		drawerIsOpen,
		setDrawerIsOpen,
		currentUser,
		isAdmin,
		setFilterType,
	} = useAuthContext();

	const urlLocation = useLocation();

	// Adding className hidden to hide elements depeding on URL
	const hidden = classNames(urlLocation.pathname !== "/" ? "hidden" : "");

	const handleToggleDrawer = () => {
		setDrawerIsOpen(!drawerIsOpen);
		setShowTips(false);
	};

	const handleToggleTipsForm = () => {
		setShowTips(!showTips);
		setDrawerIsOpen(false);
	};

	return (
		<>
			{/* Mobile view */}
			<div className="navbar bg-base-100 px-4 lg:hidden grid grid-cols-12">
				{/* Search bar */}
				<SearchForm className={`col-span-9 lg:col-span-11 ${hidden}`} />

				{/* Drawer button */}
				<button
					className={`col-start-12 justify-self-end ${hidden}`}
					onClick={handleToggleDrawer}
				>
					{drawerIsOpen ? (
						<MdOutlineClose size={25} />
					) : (
						<AiOutlineUnorderedList size={25} />
					)}
				</button>
			</div>

			{/* Desktop view */}
			<div className="navbar bg-base-100 hidden lg:grid grid-cols-12">
				{/* Logo */}
				<Link to={"/"}>
					<h1
						className="font-display btn btn-ghost normal-case text-xl col-span-2"
						onClick={() => setFilterType(null)}
					>
						Sämsta Haken
					</h1>
				</Link>

				{/* Searchform */}
				<SearchForm
					className={`w-full col-start-4 col-end-10 ${hidden}`}
				/>

				{/* Drawer button */}
				<button
					className={`font-display col-start-10 justify-self-center ${hidden}`}
					onClick={handleToggleDrawer}
				>
					{drawerIsOpen ? (
						<MdOutlineClose size={25} />
					) : (
						<AiOutlineUnorderedList size={25} />
					)}
				</button>

				{/* Tips/Register button */}
				<button
					className={`col-start-11 justify-self-end gap-2 ${hidden}`}
					onClick={handleToggleTipsForm}
				>
					<HiOutlinePencil size={20} />

					<span className="btm-nav-label font-display">
						{isAdmin ? "Registrera" : "Tipsa"}
					</span>
				</button>

				{/* Dropdown with user and admin actions */}
				<div className="dropdown dropdown-end col-start-12 justify-self-center">
					<label
						tabIndex={0}
						className="btn btn-ghost btn-circle avatar"
					>
						<AiOutlineUser size={25} />
					</label>

					{/* Dropdown list */}
					<ul
						tabIndex={0}
						className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
					>
						<li>
							{isAdmin && (
								<Link
									onClick={() => setFilterType(null)}
									to="/admin"
									className="justify-between"
								>
									Admin
								</Link>
							)}

							{currentUser ? (
								<>
									<Link
										to="/profile"
										className="justify-between"
									>
										Profil
									</Link>

									<Link
										to="/logout"
										className="justify-between"
									>
										Logga ut
									</Link>
								</>
							) : (
								<Link to="/login" className="justify-between">
									Logga in
								</Link>
							)}
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default NavBar;
