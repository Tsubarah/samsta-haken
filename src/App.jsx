import { Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import "./assets/scss/App.scss";
import LoginPage from "./pages/LoginPage";
import Drawer from "./components/Drawer";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import RestaurantPage from "./pages/RestaurantPage";
import RequireAuth from "./components/RequireAuth";
import LogoutPage from "./pages/LogoutPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedUserRoutes from "./components/ProtectedUserRoute";

function App() {
	return (
		<div className="App h-screen flex flex-col">
			<NavBar />

			<Routes>
				<Route
					path="/"
					element={
						<Drawer>
							<HomePage />
						</Drawer>
					}
				/>

				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogoutPage />} />

				<Route
					path="/profile"
					element={
						<ProtectedUserRoutes>
							<ProfilePage />
						</ProtectedUserRoutes>
					}
				/>

				<Route
					path="/admin"
					element={
						<RequireAuth>
							<AdminPage />
						</RequireAuth>
					}
				/>

				<Route
					path="/restaurants/:id"
					element={
						<RequireAuth redirectTo="/">
							<RestaurantPage />
						</RequireAuth>
					}
				/>
			</Routes>

			<Footer />

			{/* <ReactQueryDevtools position="bottom-right" /> */}
		</div>
	);
}

export default App;
