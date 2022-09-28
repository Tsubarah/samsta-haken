import {
	screen,
	renderWithContextProvider,
	render,
} from "../../utils/test-utils";
import { ref } from "../../utils/test-utils-firebase";

import Login from "../Login";

// const jest = require("jest");

import jest from "@testing-library/jest-dom";

jest.mock(ref, () => {
	return mocksdk;
});

mocksdk.firestore().flush();

describe("Test login input fields", () => {
	it("render input fields", () => {
		// render
		renderWithContextProvider(<Login />);
		// render(<Login />);
		// find
		// const emailFieldEl = screen.getByRole("textbox", {
		// 	name: /^email/i,
		// });
		// const passwordFieldEl = screen.getAllByPlaceholderText(/^password/i);
		// assert
		// expect(emailFieldEl).toBeInTheDocument();
		// expect(passwordFieldEl).toBeInTheDocument();
	});
});
