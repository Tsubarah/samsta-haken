import { useAuthContext } from "../contexts/AuthContext";
import Map from "../components/Map";
import TipsForm from "../components/TipsForm";

const HomePage = () => {
	const { showTips, setShowTips, isAdmin } = useAuthContext();

	return (
		<div className="flex flex-col h-full relative">
			<Map />

			{showTips && (
				<TipsForm
					showTips={showTips}
					setShowTips={setShowTips}
					isAdmin={isAdmin}
				/>
			)}
		</div>
	);
};

export default HomePage;
