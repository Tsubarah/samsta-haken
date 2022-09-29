import { useAuthContext } from "../contexts/AuthContext";
import Map from "../components/Map";
import TipsForm from "../components/TipsForm";

const HomePage = () => {
	const { location, showTips, setShowTips, setPlacesRef, setAutoPlacesRef } =
		useAuthContext();

	return (
		<div className="flex flex-col h-full relative">
			<Map
				position={location}
				setPlacesRef={setPlacesRef}
				setAutoPlacesRef={setAutoPlacesRef}
			/>

			{showTips && <TipsForm showTips={showTips} setShowTips={setShowTips} />}
		</div>
	);
};

export default HomePage;
