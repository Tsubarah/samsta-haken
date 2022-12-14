import { HiOutlinePencil } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { VscGithubInverted } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Footer = () => {
	const { setShowTips, showTips, currentUser, isAdmin, setDrawerIsOpen } =
		useAuthContext();

	const handleToggleTips = () => {
		setShowTips(!showTips);
		setDrawerIsOpen(false);
	};

	return (
		<>
			{/* Mobile view */}
			<div className="btm-nav my-2 relative lg:hidden">
				{/* Send tips / register */}
				<button onClick={handleToggleTips}>
					<HiOutlinePencil size={25} />

					<span className="btm-nav-label">
						{isAdmin ? "Registrera" : "Tipsa"}
					</span>
				</button>

				{/* Explore map */}
				<Link to="/">
					<MdOutlineExplore size={25} />
					<span className="btm-nav-label">Utforska</span>
				</Link>

				{/* User actions */}
				{currentUser ? (
					<div className="dropdown dropdown-top btm-nav-label">
						<label
							tabIndex={0}
							className="flex flex-col items-center gap-[3px]"
						>
							<AiOutlineUser size={25} />

							<span className="btm-nav-label normal-case">
								Profil
							</span>
						</label>

						{/* Dropdown for user actions */}
						<ul
							tabIndex={0}
							className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<Link to="/profile">
									{currentUser.displayName
										? currentUser.displayName
										: currentUser.email}
								</Link>
							</li>
							{isAdmin && (
								<li>
									<Link to="/admin">Admin</Link>
								</li>
							)}
							<li>
								<Link to="/logout">Logga ut</Link>
							</li>
						</ul>
					</div>
				) : (
					<Link to="login">
						<AiOutlineUser size={25} />
						<span className="btm-nav-label">Logga in</span>
					</Link>
				)}
			</div>

			{/* Desktop view */}
			<footer className="hidden lg:block footer footer-center p-4 bg-base-100 text-base-content">
				<div className="grid grid-cols-3 justify-center items-center">
					<p className="col-start-2">
						Copyright ?? 2022 - All right reserved by ??cklig Mat AB
					</p>
					<a
						href="https://github.com/Tsubarah/samsta-haken"
						target="_blank"
						rel="noreferrer"
						className="col-start-3 justify-self-end"
					>
						<VscGithubInverted
							size={25}
							className="hover:text-orange-500"
						/>
					</a>
				</div>
			</footer>
		</>
	);
};

export default Footer;
