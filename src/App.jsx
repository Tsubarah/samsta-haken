import { Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import HomePage from "./pages/HomePage";
import "../src/assets/scss/App.scss";

function App() {
	return (
		<div className="App h-screen">
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>

			{/* <ReactQueryDevtools position='bottom-right' /> */}
		</div>
	);
}

export default App;
