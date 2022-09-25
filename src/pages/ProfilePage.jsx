import { useRef, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import placeholder from "../assets/images/placeholder-user-300x300.png";
import { MdAddAPhoto } from "react-icons/md";

const ProfilePage = () => {
	const displayNameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [image, setImage] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

	const {
		currentUser,
		reloadUser,
		setDisplayNameAndPhoto,
		setEmail,
		setPassword,
	} = useAuthContext();

	const handleFileChange = (e) => {
		if (!e.target.files.length) {
			setImage(null);
			return;
		}

		setImage(e.target.files[0]);
		console.log("File changed!", e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords does not match");
		}

		setError(null);
		setMessage(null);

		try {
			setLoading(true);

			if (displayNameRef.current.value !== currentUser.displayName || photo) {
				await setDisplayNameAndPhoto(displayNameRef.current.value, photo);
			}

			if (emailRef.current.value !== currentUser.email) {
				await setEmail(emailRef.current.value);
			}

			if (passwordRef.current.value) {
				await setPassword(passwordRef.current.value);
			}

			await reloadUser();

			setMessage("Profile successfully updated");
			setLoading(false);
		} catch (e) {
			setError(e.message);
			setLoading(false);
		}
	};

	return (
		<div className="h-full flex flex-col items-center justify-center bg-base-content">
			<form className="form-control" onSubmit={handleSubmit}>
				<div className="card w-96 bg-white shadow-xl">
					<div className="avatar flex justify-center pt-8">
						<div className="w-52 rounded-full">
							<img
								src={currentUser.photoURL ? currentUser.photoURL : placeholder}
								alt="profile-image"
							/>
						</div>
					</div>

					<div className="card-body">
						<h2 className="card-title indent-1">Din profil</h2>

						<input
							type="text"
							name="username"
							ref={displayNameRef}
							className="input input-bordered bg-primary"
							placeholder="Användarnamn"
							defaultValue={currentUser.displayName}
						/>

						<label
							htmlFor="image"
							className="border border-grey-light p-3 rounded-md flex items-center gap-2"
						>
							<MdAddAPhoto size={25} className="text-gray-400" />
							<span className="text-gray-400">Välj bild</span>
							<input
								type="file"
								id="image"
								className="mt-2 hidden"
								onChange={handleFileChange}
							/>
							{image ? (
								`${image.name} (${Math.round(image.size / 1024)} kB)`
							) : (
								<span className="text-gray-400 text-sm italic">
									Ingen vald bild
								</span>
							)}
						</label>

						<input
							type="text"
							className="input input-bordered bg-primary"
							name="email"
							ref={emailRef}
							defaultValue={currentUser.email}
							required
						/>

						<input
							type="password"
							className="input input-bordered bg-primary"
							name="password"
							ref={passwordRef}
							placeholder="Lösenord"
							autoComplete="new-password"
						/>

						<input
							type="password"
							className="input input-bordered bg-primary"
							name="confirm_password"
							ref={passwordConfirmRef}
							placeholder="Bekräfta lösenord"
							autoComplete="new-password"
						/>

						<div className="card-actions justify-end pt-4">
							<button className="btn btn-primary text-white bg-neutral-content hover:bg-black ">
								Uppdatera din profil
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ProfilePage;
