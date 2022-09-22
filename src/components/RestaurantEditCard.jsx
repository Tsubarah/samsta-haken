import React from "react";

const RestaurantEditCard = ({ restaurant }) => {
	const social = (type) => {
		restaurant?.socials?.find((social) => {
			if (social?.title === type) return social.value;
		});
	};

	console.log(social());

	return (
		<div className="card lg:card-side bg-base-content shadow-xl h-full overflow-y-auto scrollbar-hide">
			<img src="https://placeimg.com/400/400/arch" alt="Album" />

			<div className="card-body flex flex-col items-stretch">
				<h2 className="card-title text-white self-center">Redigera haket</h2>
				<form className="flex flex-col gap-2">
					<input
						type="text"
						placeholder="Namn"
						defaultValue={restaurant.name}
						className="input input-bordered input-sm indent-2 bg-primary"
					/>

					<input
						type="text"
						placeholder="Adress"
						defaultValue={restaurant.address}
						className="input input-bordered input-sm indent-2 bg-primary"
					/>

					<input
						type="text"
						placeholder="Stad"
						defaultValue={restaurant.city}
						className="input input-bordered input-sm indent-2 bg-primary"
					/>

					<textarea
						cols="30"
						rows="10"
						placeholder="Beskrivning"
						defaultValue={restaurant.description}
						className="basis-full label-desc-text-area px-5 textarea textarea-bordered bg-primary"
					></textarea>

					<input
						type="text"
						placeholder="Typ av kök"
						defaultValue={restaurant.cuisine}
						className="input input-bordered input-sm indent-2 bg-primary"
					/>

					<input
						type="text"
						placeholder="Typ av matställe"
						defaultValue={restaurant.type_of_place}
						className="input input-bordered input-sm indent-2 bg-primary"
					/>

					<input
						type="text"
						placeholder="Utbud"
						defaultValue={restaurant.offers_food}
						className="input input-bordered input-sm indent-2 bg-primary"
					/>

					<input
						type="url"
						placeholder="hemsida"
						// defaultValue={restaurant.socials.}
						className="input input-bordered input-sm indent-2 bg-primary"
					/>

					<input
						type="email"
						placeholder="e-post"
						// defaultValue={restaurant.city}
						className="input input-bordered input-sm indent-2 bg-primary"
					/>

					<input
						type="tel"
						placeholder="tel"
						// defaultValue={restaurant.city}
						className="input input-bordered input-sm indent-2 bg-primary"
					/>

					<input
						type="url"
						placeholder="facebook"
						// defaultValue={restaurant.city}
						className="input input-bordered input-sm indent-2 bg-primary"
					/>

					<input
						type="url"
						placeholder="instagram"
						// defaultValue={restaurant.city}
						className="input input-bordered input-sm indent-2 bg-primary"
					/>

					<div className="card-actions justify-end">
						<button className="btn btn-primary">Change</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RestaurantEditCard;
