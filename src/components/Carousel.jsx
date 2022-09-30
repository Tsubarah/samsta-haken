import placeholder from "../assets/images/placeholder-image.webp";

const Carousel = ({ restaurant }) => {
	return (
		<div className="carousel carousel-end h-56 w-full p-4 space-x-4 bg-base-100">
			{restaurant &&
				restaurant.photos.map((photo, i) => (
					<div key={i} className="carousel-item relative">
						{photo.accepted ? (
							<img src={photo.url} className="rounded-box" alt="photo" />
						) : (
							<img src={placeholder} alt="placeholder" />
						)}
					</div>
				))}
		</div>
	);
};

export default Carousel;
