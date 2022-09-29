import { useAuthContext } from "../contexts/AuthContext";
import Map from "../components/Map";
import TipsForm from "../components/TipsForm";
import AdminForm from '../components/AdminForm'

const HomePage = () => {
	const { location, showTips, setShowTips, showAdminForm, setShowAdminForm } = useAuthContext();

	return (
    <div className="flex flex-col h-full relative">
      <Map position={location} />

      {showTips && <TipsForm showTips={showTips} setShowTips={setShowTips} />}
      {showAdminForm && <AdminForm showAdminForm={showAdminForm} setShowAdminForm={setShowAdminForm} />}
    </div>
  );
};

export default HomePage;
