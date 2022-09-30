import { MdOutlineCancel, MdAddPhotoAlternate } from "react-icons/md";
import {
	AiFillFacebook,
	AiOutlineGlobal,
	AiOutlineMail,
	AiFillPhone,
	AiFillInstagram,
	AiOutlineCloudUpload,
} from "react-icons/ai";

import { useAuthContext } from "../contexts/AuthContext";
import { useState } from "react";

const RestaurantCard = ({ restaurant }) => {
	// const [showRestaurantCard, setShowRestaurantCard] = useState(false);
	// console.log(restaurant);
	let icon;
	const { currentUser } = useAuthContext();
	const [image, setImage] = useState(null);

	console.log("current user", currentUser);

	const handleFileChange = (e) => {
		if (!e.target.files.length) {
			setImage(null);
			return;
		}

		setImage(e.target.files[0]);
		console.log("File changed!", e.target.files[0]);
	};

	const handleUpload = () => {
		if (!currentUser) {
			return alert("Du måste vara inloggad för att skicka in bild");
		}
	};

	return (
		<div className="card card-compact rounded-none lg:w-96 bg-base-100 shadow-xl scrollbar-thin scrollbar-thumb-base-content scrollbar-track-black">
			{/* <div className="col-span-full lg:hidden grid grid-rows-2 p-2">
				<MdOutlineCancel
					size={20}
					className="cursor-pointer justify-self-end text-base-content hover:text-error"
				/>
			</div> */}

			<figure>
				<img src="https://placeimg.com/400/225/arch" alt="Restaurant" />
			</figure>

			<div className="card-body">
				<h2 className="card-title">{restaurant.name}</h2>

				<div className="upload-photo flex items-center justify-between">
					<label
						htmlFor="image"
						className="border border-base-content p-3 rounded-full self-start flex items-center gap-2"
					>
						<MdAddPhotoAlternate size={25} />

						{image ? (
							<span className="text-gray-400 text-sm italic">
								{image.name} {Math.round(image.size / 1024)} kB
							</span>
						) : (
							<span className="text-gray-400 text-sm italic">
								Ingen vald bild
							</span>
						)}

						<input
							type="file"
							id="image"
							className="mt-2 hidden"
							onChange={handleFileChange}
						/>
					</label>

					{image && (
						<button className="btn btn-circle">
							<AiOutlineCloudUpload size={25} />
						</button>
					)}
				</div>
				<div className="divider"></div>

				<div className="flex">
					<div className="badge">{restaurant.type_of_place}</div>
					<div className="badge">{restaurant.offers_food}</div>
					<div className="badge">{restaurant.cuisine}</div>
				</div>

				<div className="pt-4">
					<h3 className="font-bold">Recension</h3>
					<p>{restaurant.description}</p>
				</div>

				<div className="divider"></div>

				<ul>
					{restaurant.socials.map((element, i) => {
						// console.log("ELment: ", element.value);
						if (element.value != "") {
							icon = element.title;
							switch (icon) {
								case "hemsida":
									return (
										<li key={i} className="p-2">
											<p className="text-xs inline-flex items-center">
												<AiOutlineGlobal
													size={20}
													className="mr-2 cursor-pointer text-primary hover:text-error"
												/>{" "}
												{element.value}
											</p>
										</li>
									);
								case "e-post":
									return (
										<li key={i} className="p-2">
											<p className="text-xs inline-flex items-center">
												<AiOutlineMail
													size={20}
													className="mr-2 cursor-pointer text-primary hover:text-error"
												/>
												{element.value}
											</p>
										</li>
									);
								case "tel":
									return (
										<li key={i} className="p-2">
											<p className="text-xs inline-flex items-center">
												<AiFillPhone
													size={20}
													className="mr-2 cursor-pointer text-primary hover:text-error"
												/>{" "}
												{element.value}
											</p>
										</li>
									);
								case "facebook":
									return (
										<li key={i} className="p-2">
											<p className="text-xs inline-flex items-center">
												<AiFillFacebook
													size={20}
													className="mr-2 cursor-pointer text-primary hover:text-error"
												/>
												{element.value}
											</p>
										</li>
									);
								case "instagram":
									return (
										<li key={i} className="p-2">
											<p className="text-xs inline-flex items-center">
												<AiFillInstagram
													size={20}
													className="mr-2 cursor-pointer text-primary hover:text-error"
												/>
												{element.value}
											</p>
										</li>
									);
								default:
									<li key={i} className="p-2">
										No socials available
									</li>;
							}
						}
					})}
				</ul>

				<div className="card-actions justify-end"></div>
			</div>
		</div>
	);
};

export default RestaurantCard;
