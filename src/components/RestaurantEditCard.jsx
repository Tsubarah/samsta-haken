import { food } from "../db/food";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getLocationWithAddress } from "../services/GoogleAPI";
import { useNavigate } from "react-router-dom";
import { checkValue } from "../utils/helpers";

const RestaurantEditCard = ({ restaurant }) => {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({});

	const docRef = doc(db, "restaurants", id);

	const handleEditSubmit = async (data) => {
		if (data === data) {
			navigate("/admin");
		}

		//Lägga in en check på om det faktiskt finns en adress?
		const address = checkValue(data.adress, restaurant.adress);
		const city = checkValue(data.city, restaurant.city);

		const dataLatLng = await getLocationWithAddress(`${address},${city}`);

		await updateDoc(docRef, {
			name: checkValue(data.name, restaurant.name),
			address: checkValue(data.address, restaurant.address),
			city: checkValue(data.city, restaurant.city),
			position: dataLatLng?.results[0]?.geometry?.location,
			description: checkValue(data.description, restaurant.description),
			cuisine: checkValue(data.cuisine, restaurant.cuisine),
			type_of_place: checkValue(
				data.type_of_place,
				restaurant.type_of_place
			),
			offers_food: checkValue(data.offers_food, restaurant.offers_food),
			website: checkValue(data.website, restaurant.website),
			email: checkValue(data.email, restaurant.email),
			tel: checkValue(data.tel, restaurant.tel),
			facebook: checkValue(data.facebook, restaurant.facebook),
			instagram: checkValue(data.instagram, restaurant.instagram),
		});

		reset();

		navigate("/admin");
	};

	return (
		<div className="card bg-base-content shadow-xl h-full overflow-y-auto scrollbar-hide">
			<div className="card-body flex flex-col items-stretch">
				<h2 className="card-title text-white self-center">
					Redigera haket
				</h2>
				<form
					onSubmit={handleSubmit(handleEditSubmit)}
					className="grid grid-cols-7 p-4 bg-base-content rounded-lg w-full h-full overflow-y-auto scrollbar-hide"
				>
					<div className="col-span-full grid grid-rows-2 px-4">
						<input
							{...register("name")}
							type="text"
							placeholder="Namn"
							defaultValue={restaurant.name}
							className="label-desc input input-bordered input-sm indent-2 bg-primary"
						/>
					</div>

					<div className="col-span-full grid grid-rows-2 px-4">
						<input
							{...register("address")}
							type="text"
							placeholder="Adress"
							defaultValue={restaurant.address}
							className="label-desc input input-bordered input-sm indent-2 bg-primary"
						/>
					</div>

					<div className="col-span-full grid grid-rows-2 px-4">
						<input
							{...register("city")}
							type="text"
							placeholder="Ort"
							defaultValue={restaurant.city}
							className="label-desc input input-bordered input-sm indent-2 bg-primary"
						/>
					</div>

					<div className="col-span-full flex flex-wrap gap-1 px-4">
						<textarea
							{...register("description", {
								minLength: {
									value: 10,
									message:
										"Lite mer får du skriva om haket...",
								},
							})}
							cols="30"
							rows="10"
							placeholder="Beskrivning"
							defaultValue={restaurant.description}
							className="basis-full label-desc-text-area mb-8 px-5 textarea textarea-bordered bg-primary"
						></textarea>
						{errors.description && (
							<div className="text-red-600 text-xs font-light py-2">
								{errors.description.message}
							</div>
						)}
					</div>

					<div className="col-span-full grid grid-rows-2 px-4">
						<select
							{...register("cuisine")}
							className="select select-bordered select-sm indent-1 font-normal bg-primary"
						>
							<option disabled>Typ av kök</option>
							{food &&
								food.cuisine.map((type, i) => (
									<option
										selected={
											type === restaurant.cuisine
												? true
												: false
										}
										key={i}
										value={type}
									>
										{type}
									</option>
								))}
						</select>
					</div>

					<div className="col-span-full grid grid-rows-2 px-4">
						<select
							{...register("type_of_place")}
							className="select select-bordered select-sm indent-1 font-normal bg-primary"
						>
							<option disabled>Typ av matställe</option>
							{food &&
								food.type_of_place.map((type, i) => (
									<option
										selected={
											type === restaurant.type_of_place
												? true
												: false
										}
										key={i}
										value={type}
									>
										{type}
									</option>
								))}
						</select>
					</div>

					<div className="col-span-full grid grid-rows-2 px-4">
						<select
							{...register("offers_food")}
							className="select select-bordered select-sm indent-1 font-normal bg-primary"
						>
							<option disabled>Utbud</option>
							{food &&
								food.offers_food.map((type, i) => (
									<option
										selected={
											type === restaurant.offers_food
												? true
												: false
										}
										key={i}
										value={type}
									>
										{type}
									</option>
								))}
						</select>
					</div>

					<div className="col-span-full grid py-2 px-4">
						<input
							{...register("website")}
							type="text"
							defaultValue={restaurant.website}
							placeholder="hemsida"
							className="label-desc input input-bordered input-sm indent-2 bg-primary"
						/>
					</div>

					<div className="col-span-full grid py-2 px-4">
						<input
							{...register("email")}
							defaultValue={restaurant.website}
							type="text"
							placeholder="e-post"
							className="label-desc input input-bordered input-sm indent-2 bg-primary"
						/>
					</div>

					<div className="col-span-full grid py-2 px-4">
						<input
							{...register("tel")}
							defaultValue={restaurant.tel}
							type="text"
							placeholder="tel"
							className="label-desc input input-bordered input-sm indent-2 bg-primary"
						/>
					</div>

					<div className="col-span-full grid py-2 px-4">
						<input
							{...register("facebook")}
							defaultValue={restaurant.facebook}
							type="text"
							placeholder="facebook"
							className="label-desc input input-bordered input-sm indent-2 bg-primary"
						/>
					</div>

					<div className="col-span-full grid py-2 px-4">
						<input
							{...register("instagram")}
							defaultValue={restaurant.instagram}
							type="text"
							placeholder="instagram"
							className="label-desc input input-bordered input-sm indent-2 bg-primary"
						/>
					</div>
					<div className="col-span-full flex px-4 mt-12">
						<button className="btn btn-block bg-primary">
							Uppdatera
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RestaurantEditCard;
