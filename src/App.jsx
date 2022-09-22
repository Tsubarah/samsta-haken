import { Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import HomePage from "./pages/HomePage";
import "../src/assets/scss/App.scss";
import LoginPage from "./pages/LoginPage";
import Drawer from "./components/Drawer";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
	return (
		<div className="App h-screen flex flex-col">
			<NavBar />

			<Routes>
				<Route path="/" element={
					<Drawer>
						<HomePage />
					</Drawer>
				} />

				<Route path="/login" element={<LoginPage />} />
			</Routes>

			<Footer />

			{/* <ReactQueryDevtools position="bottom-right" /> */}
		</div>
	);
}

export default App;
