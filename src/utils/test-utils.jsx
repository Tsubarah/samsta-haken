import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

export const renderWithBrowserRouter = (component) => {
	return render(<BrowserRouter>{component}</BrowserRouter>);
};

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
