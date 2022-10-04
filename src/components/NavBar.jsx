import { useAuthContext } from "../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

import SearchForm from "./SearchForm";
import { HiOutlinePencil } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";

const NavBar = () => {
	const {
		showTips,
		setShowTips,
		drawerIsOpen,
		setDrawerIsOpen,
		currentUser,
		isAdmin,
		setFilterType
	} = useAuthContext();

	const urlLocation = useLocation();

	const hidden = classNames(urlLocation.pathname !== "/" ? "hidden" : "");

	return (
    <>
      {/* Mobile view */}
      <div className="navbar bg-base-100 px-4 lg:hidden grid grid-cols-12">
        {/* Search bar */}
        <SearchForm className={`col-span-10 lg:col-span-11 ${hidden}`} />

        <button
          className={`col-start-12 justify-self-end ${hidden}`}
          onClick={() => setDrawerIsOpen(!drawerIsOpen)}>
          Lista
        </button>
      </div>

      {/* Desktop view */}
      <div className="navbar bg-base-100 hidden lg:grid grid-cols-12">
        <Link to={"/"}>
          <h1 className="font-display btn btn-ghost normal-case text-xl col-span-2">
            Sämsta Haken
          </h1>
        </Link>

        <SearchForm className={`w-full col-start-4 col-end-10 ${hidden}`} />

        <button
          className={`font-display col-start-10 justify-self-center ${hidden}`}
          onClick={() => setDrawerIsOpen(!drawerIsOpen)}>
          Lista
        </button>

        <button
          className={`col-start-11 justify-self-end gap-2 ${hidden}`}
          onClick={() => {
            setShowTips(!showTips);
          }}>
          <HiOutlinePencil size={20} />

          <span className="btm-nav-label font-display">
            {isAdmin ? "Registrera" : "Tipsa"}
          </span>
        </button>

        <div className="dropdown dropdown-end col-start-12 justify-self-center">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <AiOutlineUser size={25} />
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li>
              {isAdmin && (
                <Link
                  onClick={() => setFilterType(null)}
                  to="/admin"
                  className="justify-between">
                  Admin
                </Link>
              )}

              {currentUser ? (
                <>
                  <Link to="/profile" className="justify-between">
                    Profil
                  </Link>

                  <Link to="/logout" className="justify-between">
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
