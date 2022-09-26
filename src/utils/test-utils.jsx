import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "../contexts/AuthContext";

export const renderWithBrowserRouter = (component) => {
	return render(<BrowserRouter>{component}</BrowserRouter>);
};

export const renderWithContextProvider = (component) => {
	return render(<AuthContextProvider>{component}</AuthContextProvider>);
};

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
