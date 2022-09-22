import React from "react";

const RestaurantEditCard = () => {
	return (
		<div className="card lg:card-side bg-base-content shadow-xl">
			<figure>
				<img src="https://placeimg.com/400/400/arch" alt="Album" />
			</figure>
			<div className="card-body">
				<h2 className="card-title text-white">New album is released!</h2>

				<div className="col-span-full grid grid-rows-2 px-4">
					<input
						type="text"
						placeholder="Namn"
						className="label-desc input input-bordered input-sm indent-2 bg-primary"
					/>
				</div>

				<div className="col-span-full grid grid-rows-2 px-4">
					<input
						type="text"
						placeholder="Adress"
						className="label-desc input input-bordered input-sm indent-2 bg-primary"
					/>
				</div>

				<div className="col-span-full flex flex-wrap gap-1 px-4">
					<textarea
						cols="30"
						rows="10"
						placeholder="Beskrivning"
						className="basis-full label-desc-text-area mb-8 px-5 textarea textarea-bordered bg-primary"
					></textarea>
				</div>

				<div className="col-span-full grid grid-rows-2 px-4">
					<input
						type="text"
						placeholder="Typ av kök"
						className="label-desc input input-bordered input-sm indent-2 bg-primary"
					/>
				</div>

				<div className="col-span-full grid grid-rows-2 px-4">
					<input
						type="text"
						placeholder="Typ av matställe"
						className="label-desc input input-bordered input-sm indent-2 bg-primary"
					/>
				</div>

				<div className="col-span-full grid grid-rows-2 px-4">
					<input
						type="text"
						placeholder="Utbud"
						className="label-desc input input-bordered input-sm indent-2 bg-primary"
					/>
				</div>
				<div className="card-actions justify-end">
					<button className="btn btn-primary">Change</button>
				</div>
			</div>
		</div>
	);
};

export default RestaurantEditCard;
