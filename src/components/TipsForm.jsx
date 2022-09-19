import { MdOutlineCancel } from "react-icons/md";

const TipsForm = ({ showTips, setShowTips }) => {
	return (
		<dialog
			open={showTips}
			className="border-none flex items-center justify-center h-screen w-full"
		>
			<form className="grid grid-cols-7 p-4 bg-white rounded-lg w-full h-full">
				<div className="col-span-full grid grid-rows-2">
					<MdOutlineCancel
						size={20}
						className="cursor-pointer justify-self-end"
						onClick={() => setShowTips(!showTips)}
					/>

					<h2 className="text-center pb-4">Tipsa om det sämsta haket</h2>
				</div>

				<div className="col-span-full grid grid-rows-2 px-4">
					<input
						type="text"
						placeholder="Namn"
						className="label-desc rounded-md border"
					/>
				</div>

				<div className="col-span-full grid grid-rows-2 px-4">
					<input
						type="text"
						placeholder="Adress"
						className="label-desc rounded-md border"
					/>
				</div>

				<div className="col-span-full grid grid-rows-2 px-4">
					<input
						type="text"
						placeholder="Ort"
						className="label-desc rounded-md border"
					/>
				</div>

				<div className="col-span-full flex flex-wrap gap-1 px-4">
					<textarea
						cols="30"
						rows="10"
						placeholder="Beskrivning"
						className="basis-full label-desc mb-8 rounded-md border"
					></textarea>
				</div>

				<div className="col-span-full grid grid-rows-2 px-4">
					<select className="rounded-md border">
						<option
							value=""
							disabled
							selected
							hidden
							className="label-desc-option-value"
						>
							Typ av kök
						</option>
					</select>
				</div>

				<div className="col-span-full grid grid-rows-2 px-4">
					<select className="rounded-md border">
						<option
							value=""
							disabled
							selected
							hidden
							className="label-desc-option-value"
						>
							Typ av matställe
						</option>
					</select>
				</div>

				<div className="col-span-full grid grid-rows-2 px-4">
					<select className="rounded-md border">
						<option
							value=""
							disabled
							selected
							hidden
							className="label-desc-option-value"
						>
							Utbud
						</option>
					</select>
				</div>

				<div className="col-span-full flex flex-wrap px-4">
					<div className="basis-full grid gap-3">
						<input
							type="text"
							placeholder="Hemsida"
							className="label-desc rounded-md border py-1"
						/>
						<input
							type="text"
							placeholder="E-post"
							className="label-desc rounded-md border py-1"
						/>
						<input
							type="text"
							placeholder="Telefonnummer"
							className="label-desc rounded-md border py-1"
						/>
						<input
							type="text"
							placeholder="Instagram"
							className="label-desc rounded-md border py-1"
						/>
						<input
							type="text"
							placeholder="Facebook"
							className="label-desc rounded-md border py-1"
						/>
					</div>
				</div>

				<div className="col-span-full flex px-4 my-4">
					<button className="border-none basis-full rounded-md bg-blue-500 hover:bg-blue-700 text-white">
						Skicka in
					</button>
				</div>
			</form>
		</dialog>
	);
};

export default TipsForm;
