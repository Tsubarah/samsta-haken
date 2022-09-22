import { Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import "../src/assets/scss/App.scss";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
	return (
		<div className="App h-screen flex flex-col">
			<NavBar />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/admin" element={<AdminPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>

			<Footer />

			{/* <ReactQueryDevtools position="bottom-right" /> */}
		</div>
	);
}

export default App;
