const RestaurantsTable = ({ restaurants }) => {
	console.log(restaurants);

	return (
		<div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-black">
			<table className="table table-zebra w-full">
				{/* <!-- head --> */}
				<thead>
					<tr>
						<th></th>
						<th>Namn</th>
						<th>Addres</th>
						<th>Stad</th>
						<th>Typ av matställe</th>
						<th>Utbud</th>
						<th>Typ av mat</th>
						{restaurants &&
							restaurants.map((restaurant) =>
								restaurant.socials.map((social, i) => (
									<th key={i}>{social.title}</th>
								))
							)}
						<th>Godkänd</th>
					</tr>
				</thead>
				<tbody>
					{restaurants &&
						restaurants.map((restaurant, i) => (
							<tr key={restaurant.id}>
								<td>{i + 1}</td>
								<td>{restaurant.name}</td>
								<td>{restaurant.address}</td>
								<td>{restaurant.city}</td>
								<td>{restaurant.cuisine}</td>
								<td>{restaurant.type_of_place}</td>
								<td>{restaurant.offers_food}</td>

								{restaurant.socials.map((social, i) => (
									<td key={i}> {social.value}</td>
								))}

								<td className="text-center">
									{restaurant.accepted ? (
										<button className="btn btn-success">J</button>
									) : (
										<button className="btn btn-error">N</button>
									)}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default RestaurantsTable;
