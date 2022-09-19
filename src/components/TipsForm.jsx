import { food } from "../db/food";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useForm, useFieldArray } from "react-hook-form";

import { MdOutlineCancel } from "react-icons/md";

const TipsForm = ({ showTips, setShowTips }) => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			socials: [
				{ title: "hemsida" },
				{ title: "e-post" },
				{ title: "tel" },
				{ title: "facebook" },
				{ title: "instagram" },
			],
		},
	});

	const { fields } = useFieldArray({
		control,
		name: "socials",
	});

	// const options = [
	// 	{ value, label: "Hemsida" },
	// 	{ value, label: "Epost" },
	// 	{ value, label: "Telefonnummer" },
	// 	{ value, label: "Facebook" },
	// 	{ value, label: "Instagram" },
	// ];

	console.log(fields);

	const collectionRef = collection(db, "restaurants");

	const handleTipsSubmit = async (data) => {
		await addDoc(collectionRef, {
			accepted: false,
			name: data.name,
			address: data.address,
			city: data.city,
			description: data.description,
			cuisine: data.cuisine,
			type_of_place: data.type_of_place,
			offers_food: data.offers_food,
			photos: [],
			socials: data.socials,
			// website: data.website,
			// email: data.email,
			// phone: data.phone,
			// facebook: data.facebook,
			// instagram: data.instagram,
		});

		reset();
	};

	return (
		<dialog
			open={showTips}
			className="border-none flex items-center justify-center w-full"
		>
			<form
				onSubmit={handleSubmit(handleTipsSubmit)}
				className="grid grid-cols-7 p-4 bg-white rounded-lg w-full"
			>
				<div className="col-span-full grid grid-rows-2">
					<MdOutlineCancel
						size={20}
						className="cursor-pointer justify-self-end"
						onClick={() => setShowTips(!showTips)}
					/>

					<h2 className="text-center font-semibold text-2xl pb-4">
						Tipsa om det sämsta haket
					</h2>
				</div>

				<div className="col-span-full grid grid-rows-2 px-4">
					<input
						{...register("name", {
							required: "Haket måste väl ha ett namn?!",
						})}
						type="text"
						placeholder="Namn"
						className="label-desc rounded-md border indent-2"
					/>
					{errors.name && (
						<div className="text-red-600 text-xs font-light py-2">
							{errors.name.message}
						</div>
					)}
				</div>

				<div className="col-span-full grid grid-rows-2 px-4">
					<input
						{...register("address", {
							required: "Hur ska man man hitta dit om du inte anger en adress?",
						})}
						type="text"
						placeholder="Adress"
						className="label-desc rounded-md border indent-2"
					/>
					{errors.address && (
						<div className="text-red-600 text-xs font-light py-2">
							{errors.address.message}
						</div>
					)}
				</div>

				<div className="col-span-full grid grid-rows-2 px-4">
					<input
						{...register("city", {
							required: "Men hallå, staden? Tack!",
						})}
						type="text"
						placeholder="Ort"
						className="label-desc rounded-md border indent-2"
					/>
					{errors.city && (
						<div className="text-red-600 text-xs font-light py-2">
							{errors.city.message}
						</div>
					)}
				</div>

				<div className="col-span-full flex flex-wrap gap-1 px-4">
					<textarea
						{...register("description", {
							minLength: {
								value: 10,
								message: "Lite mer får du skriva om haket...",
							},
						})}
						cols="30"
						rows="10"
						placeholder="Beskrivning"
						className="basis-full label-desc mb-8 p-2 rounded-md border"
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
						className="rounded-md border indent-2"
					>
						<option
							defaultValue="Typ av kök"
							disabled
							className="label-desc-option-value"
						>
							Typ av kök
						</option>
						{food &&
							food.cuisine.map((type, i) => (
								<option key={i} value={type}>
									{type}
								</option>
							))}
					</select>
				</div>

				<div className="col-span-full grid grid-rows-2 px-4">
					<select
						{...register("type_of_place")}
						className="rounded-md border indent-2"
					>
						<option
							defaultValue="Typ av matställe"
							disabled
							className="label-desc-option-value"
						>
							Typ av matställe
						</option>
						{food &&
							food.type_of_place.map((type, i) => (
								<option key={i} value={type}>
									{type}
								</option>
							))}
					</select>
				</div>

				<div className="col-span-full grid grid-rows-2 px-4">
					<select
						{...register("offers_food")}
						className="rounded-md border indent-2"
					>
						<option
							defaultValue="Utbud"
							disabled
							className="label-desc-option-value"
						>
							Utbud
						</option>
						{food &&
							food.offers_food.map((type, i) => (
								<option key={i} value={type}>
									{type}
								</option>
							))}
					</select>
				</div>

				<div className="col-span-full flex flex-wrap px-4">
					<div className="basis-full grid gap-3">
						{fields.map((item, index) => (
							<input
								key={item.id}
								placeholder={`${item.title}`}
								{...register(`socials.${index}.value`)}
								className="label-desc rounded-md border py-1 indent-2"
							/>
						))}
					</div>
				</div>

				<div className="col-span-full flex px-4 my-4">
					<button className="border-none basis-full rounded-md py-2 bg-blue-500 hover:bg-blue-700 text-white">
						Skicka in
					</button>
				</div>
			</form>
		</dialog>
	);
};

export default TipsForm;
