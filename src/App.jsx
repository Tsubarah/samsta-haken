import { Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import HomePage from "./pages/HomePage";
import AdminPage from './pages/AdminPage'
import "../src/assets/scss/App.scss";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";

function App() {
	return (
    <div className="App h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      <ReactQueryDevtools position="bottom-right" />
    </div>
  );
}

export default App;
