import { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { useAuthContext } from "../contexts/AuthContext";

const LoginPage = () => {
	const [loading, setLoading] = useState(false);
	const { loginSwipe } = useAuthContext();

	console.log(loginSwipe);

	return (
		// <div className="h-full grid place-content-center">
		// 	{loading && <div>loading...</div>}

		<div
			className={`flex w-[200%] transition duration-500 ${
				loginSwipe ? "-translate-x-1/2" : ""
			}`}
		>
			<div className="grid h-screen place-content-center w-full">
				<Login />
			</div>
			<div className="grid h-screen place-content-center w-full">
				<Signup />
			</div>
		</div>
		// </div>
	);
};

export default LoginPage;
