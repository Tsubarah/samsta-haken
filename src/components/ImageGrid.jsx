import { useAuthContext } from "../contexts/AuthContext";
import useDeleteImage from "../hooks/useDeleteImage";
import useGetCollection from "../hooks/useGetCollection";

const ImageGrid = () => {
	const { updateRestaurantPhoto } = useAuthContext();
	const { deleteImage } = useDeleteImage();

	const { data: imageRequests } = useGetCollection("image-requests");

	const handlePhotoStatus = (photo) => {
		updateRestaurantPhoto(photo);
	};

	return (
		<div className="flex flex-col items-center gap-4 py-4 overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-black lg:grid lg:grid-cols-4 lg:items-stretch lg:px-4">
			{imageRequests.length > 0 ? (
				imageRequests.map((photo) => (
					<div
						key={photo.id}
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
							<div className="flex gap-4 justify-center">
								<button
									className="btn btn-error"
									onClick={() => deleteImage(photo)}
								>
									Radera
								</button>

								{!photo.accepted && (
									<button
										className="btn btn-success"
										onClick={() => handlePhotoStatus(photo)}
									>
										Godkänn
									</button>
								)}
							</div>
						</div>
					</div>
				))
			) : (
				<h3 className="text-center col-span-full">Inga bilder att godkänna</h3>
			)}
		</div>
	);
};

export default ImageGrid;
