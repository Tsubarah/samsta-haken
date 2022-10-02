import { useAuthContext } from "../contexts/AuthContext";
import useDeleteImage from "../hooks/useDeleteImage";

const ImageGrid = ({ restaurants }) => {
	const { updateRestaurantPhoto } = useAuthContext();
	const { deleteImage } = useDeleteImage();

	const handlePhotoStatus = (restaurantId, photo) => {
		updateRestaurantPhoto(restaurantId, photo);
	};

	const handleDeletePhoto = (photo) => {};

	return (
		<div className="flex flex-col items-center gap-4 py-4 overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-black lg:grid lg:grid-cols-4 lg:items-stretch lg:px-4">
			{restaurants.map((restaurant) => (
				<>
					{restaurant.photos.length > 0 &&
						restaurant.photos.map((photo, i) => (
							<div
								key={i}
								className="card overflow-visible w-96 bg-base-content shadow-xl lg:w-full"
							>
								<figure>
									<img src={photo.url} alt="Shoes" className="rounded-t-xl" />
								</figure>
								<div className="card-body flex-grow">
									<h2 className="card-title text-white">{photo.restaurant}</h2>
									<p className="text-white">
										Uppladdat av: {photo.uploaded_by_user}
									</p>
									<div className="flex gap-4 justify-end">
										<button
											className="btn btn-error"
											onClick={() => deleteImage(photo, restaurant)}
										>
											Radera
										</button>

										{photo.accepted ? (
											<button
												className="btn btn-success"
												onClick={() => handlePhotoStatus(restaurant.id, photo)}
											>
												Godkänd
											</button>
										) : (
											<button
												className="btn btn-warning"
												onClick={() => handlePhotoStatus(restaurant.id, photo)}
											>
												Ej godkänd
											</button>
										)}
									</div>
								</div>
							</div>
						))}
				</>
			))}
		</div>
	);
};

export default ImageGrid;
