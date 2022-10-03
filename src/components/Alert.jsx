import { BiErrorCircle } from "react-icons/bi";

const Alert = ({ variant, message }) => {
	return (
		<div className={`alert shadow-lg py-2 mt-4 ${variant}`}>
			<div>
				<BiErrorCircle size={20} />
				<span>{message}</span>
			</div>
		</div>
	);
};

export default Alert;
