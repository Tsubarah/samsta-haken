import { useRef, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Signup = () => {
	const displayNameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [image, setImage] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { signup, setLoginSwipe } = useAuthContext();
	const navigate = useNavigate();

	const handleFileChange = (e) => {
		if (!e.target.files[0]) {
			setImage(null);
			return;
		}

		setImage(e.target.files[0]);
		console.log("File changed!", e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validates that the user entered the same password in both input fields
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords does not match");
		}

		setError(null);

		// Try to sign up the user
		try {
			setLoading(true);
			console.log(image);

			await signup(
				emailRef.current.value,
				passwordRef.current.value,
				displayNameRef.current.value,
				image
			);

			navigate("/");

			setLoading(false);
		} catch (err) {
			setError(err.message);
			setLoading(false);
			console.log(err);
		}
	};

	return (
		<>
			{loading && (
				<div className="flex justify-center p-4">
					<ClipLoader color="#FFFF" />
				</div>
			)}

			<div>
				<form onSubmit={handleSubmit}>
					<div className="bg-grey-lighter flex flex-col">
						<div className="container max-w-xs mx-auto flex-1 flex flex-col items-center justify-center px-2">
							<div className="flex justify-center flex-col bg-white px-6 py-8 rounded shadow-md text-black w-full">
								<h1 className="mb-8 text-3xl text-center font-display">
									Sign up
								</h1>

								<input
									type="text"
									className="block border border-grey-light p-3 rounded mb-4"
									name="username"
									ref={displayNameRef}
									required
									placeholder="Username"
								/>

								<label className="block border border-grey-light p-3 rounded mb-4">
									<input
										type="file"
										id="image"
										onChange={handleFileChange}
										className="mt-2"
									/>
								</label>

								<input
									type="text"
									className="block border border-grey-light p-3 rounded mb-4"
									name="email"
									ref={emailRef}
									required
									placeholder="Email"
								/>

								<input
									type="password"
									className="block border border-grey-light p-3 rounded mb-4"
									name="password"
									ref={passwordRef}
									required
									placeholder="Password"
								/>

								<input
									type="password"
									className="block border border-grey-light p-3 rounded mb-4"
									name="confirm_password"
									ref={passwordConfirmRef}
									required
									placeholder="Confirm Password"
								/>

								<button className="block border border-grey-light p-3 rounded">
									Create Account
								</button>
							</div>
						</div>
					</div>
				</form>

				{/* Show error message */}
				{error && (
					<div className="pt-2">
						<div className="alert alert-error shadow-lg">
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="stroke-current flex-shrink-0 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>{error}</span>
							</div>
						</div>
					</div>
				)}

				<div className="flex flex-col justify-center text-grey-dark w-full">
					<p className="m-auto pt-4 text-md">
						Already have an account?
					</p>
					<button
						className="px-8 h-8 text-sm underline"
						onClick={() => {
							setLoginSwipe(false);
						}}
					>
						Sign in
					</button>
				</div>
			</div>
		</>
	);
};

export default Signup;
