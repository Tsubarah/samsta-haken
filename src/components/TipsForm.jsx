import { food } from "../db/food";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useForm } from "react-hook-form";

import { MdOutlineCancel } from "react-icons/md";
import { getLocationWithAddress } from "../services/GoogleAPI";

const TipsForm = ({ showTips, setShowTips, isAdmin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  //Ceate ref to the collection
  const collectionRef = collection(db, "restaurants");

  const handleTipsSubmit = async (data) => {
    const dataLatLng = await getLocationWithAddress(
      `${data.address},${data.city}`
    );

    // Add data to the collection
    await addDoc(collectionRef, {
      accepted: isAdmin ? true : false,
      name: data.name,
      address: data.address,
      city: data.city,
      position: dataLatLng.results[0].geometry.location,
      description: data.description,
      cuisine: data.cuisine,
      type_of_place: data.type_of_place,
      offers_food: data.offers_food,
      photos: [],
      website: data.website,
      email: data.email,
      tel: data.tel,
      facebook: data.facebook,
      instagram: data.instagram,
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
        className="grid grid-cols-7 p-4 bg-base-content rounded-lg w-full h-full lg:w-3/6 lg:h-4/5 overflow-y-auto scrollbar-hide">
        <div className="col-span-full grid grid-rows-2">
          <MdOutlineCancel
            size={25}
            className="cursor-pointer justify-self-end text-primary hover:text-error"
            onClick={() => setShowTips(!showTips)}
          />

          <h2 className="text-center font-display font-semibold text-2xl pb-4 text-primary">
            {isAdmin ? "Registrera ett hak" : "Tipsa om det sämsta haket"}
          </h2>
        </div>

        <div className="col-span-full grid grid-rows-2 px-4">
          <input
            {...register("name", {
              required: "Haket måste väl ha ett namn?!",
            })}
            type="text"
            placeholder="Namn"
            className="label-desc input input-bordered input-sm indent-2 bg-primary"
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
            className="label-desc input input-bordered input-sm indent-2 bg-primary"
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
            className="label-desc input input-bordered input-sm indent-2 bg-primary"
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
            className="basis-full label-desc-text-area mb-8 px-5 textarea textarea-bordered bg-primary"></textarea>
          {errors.description && (
            <div className="text-red-600 text-xs font-light py-2">
              {errors.description.message}
            </div>
          )}
        </div>

        <div className="col-span-full grid grid-rows-2 px-4">
          <select
            {...register("cuisine")}
            className="select select-bordered select-sm indent-1 font-normal bg-primary"
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
            className="select select-bordered select-sm indent-1 font-normal bg-primary"
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
            className="select select-bordered select-sm indent-1 font-normal bg-primary"
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

        {/* Socials inputs */}
        <div className="col-span-full grid py-2 px-4">
          <input
            {...register("website")}
            type="text"
            placeholder="hemsida"
            className="label-desc input input-bordered input-sm indent-2 bg-primary"
          />
        </div>

        <div className="col-span-full grid py-2 px-4">
          <input
            {...register("email")}
            type="text"
            placeholder="e-post"
            className="label-desc input input-bordered input-sm indent-2 bg-primary"
          />
        </div>

        <div className="col-span-full grid py-2 px-4">
          <input
            {...register("tel")}
            type="text"
            placeholder="tel"
            className="label-desc input input-bordered input-sm indent-2 bg-primary"
          />
        </div>

        <div className="col-span-full grid py-2 px-4">
          <input
            {...register("facebook")}
            type="text"
            placeholder="facebook"
            className="label-desc input input-bordered input-sm indent-2 bg-primary"
          />
        </div>

        <div className="col-span-full grid py-2 px-4">
          <input
            {...register("instagram")}
            type="text"
            placeholder="instagram"
            className="label-desc input input-bordered input-sm indent-2 bg-primary"
          />
        </div>

        <div className="col-span-full flex px-4 mt-12">
          <button className="btn btn-block bg-primary">
            {isAdmin ? "Registrera" : "Skicka in"}
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default TipsForm;
