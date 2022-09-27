import { food } from "../db/food";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useForm, useFieldArray } from "react-hook-form";

import { MdOutlineCancel } from "react-icons/md";
import { getLocationWithAddress } from "../services/googleAPI";

const TipsForm = ({ showTips, setShowTips }) => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			socials: [
				{ title: "hemsida" },
				{ title: "e-post" },
				{ title: "tel" },
				{ title: "facebook" },
				{ title: "instagram" },
			],
		},
	});

	const { fields } = useFieldArray({
		control,
		name: "socials",
	});

	const collectionRef = collection(db, "restaurants");

	const handleTipsSubmit = async (data) => {
		const dataLatLng = await getLocationWithAddress(
			`${data.address},${data.city}`
		);

		await addDoc(collectionRef, {
			accepted: false,
			name: data.name,
			address: data.address,
			city: data.city,
			position: dataLatLng.results[0].geometry.location,
			description: data.description,
			cuisine: data.cuisine,
			type_of_place: data.type_of_place,
			offers_food: data.offers_food,
			photos: [],
			socials: data.socials,
		});

		reset();
		setShowTips(!showTips);
	};

	return (
    <dialog
      open={showTips}
      className="border-none flex items-center justify-center w-full h-full">
      <form
        onSubmit={handleSubmit(handleTipsSubmit)}
        className="grid grid-cols-7 p-4 bg-neutral rounded-lg w-full h-full lg:w-3/6 lg:h-4/5 overflow-y-auto scrollbar-hide">
        <div className="col-span-full grid grid-rows-2">
          <MdOutlineCancel
            size={25}
            className="cursor-pointer justify-self-end text-primary hover:text-error"
            onClick={() => setShowTips(!showTips)}
          />

          <h2 className="text-center font-semibold text-2xl pb-4 text-primary">
            Tipsa om det sämsta haket
          </h2>
        </div>

        <div className="col-span-full grid grid-rows-2 px-4">
          <input
            {...register("name", {
              required: "Haket måste väl ha ett namn?!",
            })}
            type="text"
            placeholder="Namn"
            className="label-desc input input-bordered border input-sm indent-2 bg-base-content"
          />
          {errors.name && (
            <div className="text-red-600 text-xs font-light py-2">
              {errors.name.message}
            </div>
          )}
        </div>

        <div className="col-span-full grid grid-rows-2 px-4">
          <input
            {...register("address", {
              required: "Hur ska man man hitta dit om du inte anger en adress?",
            })}
            type="text"
            placeholder="Adress"
            className="label-desc input input-bordered input-sm indent-2 bg-base-content"
          />
          {errors.address && (
            <div className="text-red-600 text-xs font-light py-2">
              {errors.address.message}
            </div>
          )}
        </div>

        <div className="col-span-full grid grid-rows-2 px-4">
          <input
            {...register("city", {
              required: "Men hallå, staden? Tack!",
            })}
            type="text"
            placeholder="Ort"
            className="label-desc input input-bordered input-sm indent-2 bg-base-content"
          />
          {errors.city && (
            <div className="text-red-600 text-xs font-light py-2">
              {errors.city.message}
            </div>
          )}
        </div>

        <div className="col-span-full flex flex-wrap gap-1 px-4">
          <textarea
            {...register("description", {
              minLength: {
                value: 10,
                message: "Lite mer får du skriva om haket...",
              },
            })}
            cols="30"
            rows="10"
            placeholder="Beskrivning"
            className="basis-full label-desc-text-area mb-8 px-5 textarea textarea-bordered bg-base-content"></textarea>
          {errors.description && (
            <div className="text-red-600 text-xs font-light py-2">
              {errors.description.message}
            </div>
          )}
        </div>

        <div className="col-span-full grid grid-rows-2 px-4">
          <select
            {...register("cuisine")}
            className="select select-bordered select-sm indent-1 font-normal bg-base-content"
            defaultValue="Typ av kök">
            <option disabled>Typ av kök</option>
            {food &&
              food.cuisine.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
          </select>
        </div>

        <div className="col-span-full grid grid-rows-2 px-4">
          <select
            {...register("type_of_place")}
            className="select select-bordered select-sm indent-1 font-normal bg-base-content"
            defaultValue="Typ av matställe">
            <option disabled>Typ av matställe</option>
            {food &&
              food.type_of_place.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
          </select>
        </div>

        <div className="col-span-full grid grid-rows-2 px-4">
          <select
            {...register("offers_food")}
            className="select select-bordered select-sm indent-1 font-normal bg-base-content"
            defaultValue="Utbud">
            <option disabled>Utbud</option>
            {food &&
              food.offers_food.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
          </select>
        </div>

        <div className="col-span-full flex flex-wrap px-4">
          <div className="basis-full grid gap-3">
            {fields.map((item, index) => (
              <input
                key={item.id}
                placeholder={`${item.title}`}
                {...register(`socials.${index}.value`)}
                className="label-desc input input-bordered input-sm indent-2 bg-base-content"
              />
            ))}
          </div>
        </div>

        <div className="col-span-full flex px-4 mt-12">
          <button className="btn btn-block bg-primary">Skicka in</button>
        </div>
      </form>
    </dialog>
  );
};

export default TipsForm;
