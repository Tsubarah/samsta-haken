import { useAuthContext } from "../contexts/AuthContext";
import Map from "../components/Map";
import TipsForm from "../components/TipsForm";

const HomePage = () => {
	const { location, showTips, setShowTips } = useAuthContext();

	return (
		<div className="flex flex-col h-full">
			<Map position={location} />

			{showTips && <TipsForm showTips={showTips} setShowTips={setShowTips} />}
		</div>
	);
};

export default HomePage;
