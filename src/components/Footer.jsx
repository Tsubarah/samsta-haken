import { HiOutlinePencil } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { VscGithubInverted } from "react-icons/vsc";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<>
			<div className="btm-nav lg:hidden">
				<button>
					<HiOutlinePencil size={25} />
					<span className="btm-nav-label">Tipsa</span>
				</button>
				<Link to="/">
					<MdOutlineExplore size={25} />
					<span className="btm-nav-label">Utforska</span>
				</Link>
				<Link to="login">
					<AiOutlineUser size={25} />
					<span className="btm-nav-label">Logga in</span>
				</Link>
			</div>

			<footer className="hidden lg:block footer footer-center p-4 bg-base-100 text-base-content">
				<div className="grid grid-cols-3 justify-center items-center">
					<p className="col-start-2">
						Copyright © 2022 - All right reserved by Äcklig Mat AB
					</p>
					<a
						href="https://github.com/Tsubarah/samsta-haken"
						target="_blank"
						rel="noreferrer"
						className="col-start-3 justify-self-end"
					>
						<VscGithubInverted size={25} className="hover:text-orange-500" />
					</a>
				</div>
			</footer>
		</>
	);
};

export default Footer;
