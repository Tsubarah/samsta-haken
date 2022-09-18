import useCurrentLocation from "../hooks/useCurrentLocation";

const HomePage = () => {
	const { getCurrentLocation, currentAddress } = useCurrentLocation();

	console.log(currentAddress);

	return (
		<div className="flex">
			<h1 className="m-auto">Home</h1>

			<button onClick={getCurrentLocation}>Current position</button>
		</div>
	);
};

export default HomePage;
