import { Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import HomePage from "./pages/HomePage";
import "../src/assets/scss/App.scss";
import LoginPage from "./pages/LoginPage";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>

			<ReactQueryDevtools position="bottom-right" />
		</div>
	);
}

export default App;
