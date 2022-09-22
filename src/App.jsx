import { Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import HomePage from "./pages/HomePage";
import "../src/assets/scss/App.scss";
import LoginPage from "./pages/LoginPage";
import Drawer from "./components/Drawer";

function App() {
	return (
		<div className="App h-screen">
			<Routes>
				<Route path="/" element={
					<Drawer>
						<HomePage />
					</Drawer>
				} />

				<Route path="/login" element={<LoginPage />} />
			</Routes>

			<ReactQueryDevtools position="bottom-right" />
		</div>
	);
}

export default App;
