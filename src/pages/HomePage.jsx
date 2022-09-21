import { useState } from "react";
import Map from "../components/Map";

import TipsForm from "../components/TipsForm";
import { useAuthContext } from "../contexts/AuthContext";

const HomePage = () => {
	const { location } = useAuthContext();

	const [showTips, setShowTips] = useState(false);

	return (
		<div className="flex flex-col h-full">
			<Map position={location} />

			{/* 
			{showTips && <TipsForm showTips={showTips} setShowTips={setShowTips} />} */}
		</div>
	);
};

export default HomePage;
