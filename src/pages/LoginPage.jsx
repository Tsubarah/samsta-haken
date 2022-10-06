import { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { useAuthContext } from "../contexts/AuthContext";

const LoginPage = () => {
	const { loginSwipe } = useAuthContext();

	return (
		<div
			className={`flex w-[200%] transition duration-500 h-full ${
				loginSwipe ? "-translate-x-1/2" : ""
			}`}
		>
			<div className="grid h-full place-content-center w-full">
				<Login />
			</div>

			<div className="grid h-full place-content-center w-full">
				<Signup />
			</div>
		</div>
	);
};

export default LoginPage;
