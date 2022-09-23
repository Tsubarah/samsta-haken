import { food } from "../db/food";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useForm, useFieldArray } from "react-hook-form";

const RestaurantEditCard = ({ restaurant }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // defaultValues: {
    //   socials: [
    //     { title: "hemsida" },
    //     { title: "e-post" },
    //     { title: "tel" },
    //     { title: "facebook" },
    //     { title: "instagram" },
    //   ],
    // },
  });

//   const { fields } = useFieldArray({
//     control,
//     name: "socials",
//   });
console.log("Restaurant: ", restaurant);
console.log("Restaurant id: ", restaurant.id)

  const docRef = doc(db, "restaurants", restaurant.id);

  const handleEditSubmit = async (data) => {
    await updateDoc(docRef, {
      name: data.name,
      address: data.address,
      city: data.city,
      position: dataLatLng.results[0].geometry.location,
      description: data.description,
      //cuisine: data.cuisine,
      //type_of_place: data.type_of_place,
      //offers_food: data.offers_food,
      //photos: [],
      //socials: data.socials,
    });

    reset();
  };

  return (
    <div className="card lg:card-side bg-base-content shadow-xl h-full overflow-y-auto scrollbar-hide">
      <img src="https://placeimg.com/400/400/arch" alt="Album" />

      <div className="card-body flex flex-col items-stretch">
        <h2 className="card-title text-white self-center">Redigera haket</h2>
        <form
          onSubmit={handleSubmit(handleEditSubmit)}
          className="grid grid-cols-7 p-4 bg-base-content rounded-lg w-full h-full lg:w-3/6 lg:h-4/5 overflow-y-auto scrollbar-hide">
          {/* <div className="col-span-full grid grid-rows-2">
            <MdOutlineCancel
              size={25}
              className="cursor-pointer justify-self-end text-primary hover:text-error"
              onClick={() => setShowTips(!showTips)}
            />

            <h2 className="text-center font-semibold text-2xl pb-4 text-primary">
              Tipsa om det sämsta haket
            </h2>
          </div> */}

          <div className="col-span-full grid grid-rows-2 px-4">
            <input
              {...register("name", {
                required: "Haket måste väl ha ett namn?!",
              })}
              type="text"
              placeholder="Namn"
              defaultValue={restaurant.name}
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
                required:
                  "Hur ska man man hitta dit om du inte anger en adress?",
              })}
              type="text"
              placeholder="Adress"
              defaultValue={restaurant.address}
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
              defaultValue={restaurant.city}
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
              defaultValue={restaurant.description}
              className="basis-full label-desc-text-area mb-8 px-5 textarea textarea-bordered bg-primary"></textarea>
            {errors.description && (
              <div className="text-red-600 text-xs font-light py-2">
                {errors.description.message}
              </div>
            )}
          </div>

          {/* <div className="col-span-full grid grid-rows-2 px-4">
            <select
              {...register("cuisine")}
              className="select select-bordered select-sm indent-1 font-normal bg-primary"
              defaultValue={restaurant.cuisine}>
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
              defaultValue={restaurant.type_of_place}>
              <option disabled>Typ av matställe</option>
              {food &&
                food.type_of_place.map((type, i) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
            </select>
          </div> */}

          {/* <div className="col-span-full grid grid-rows-2 px-4">
            <select
              {...register("offers_food")}
              className="select select-bordered select-sm indent-1 font-normal bg-primary"
              defaultValue={restaurant.offers_food}>
              <option disabled>Utbud</option>
              {food &&
                food.offers_food.map((type, i) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
            </select>
          </div> */}

          {/* <div className="col-span-full flex flex-wrap px-4">
            <div className="basis-full grid gap-3">
              {fields.map((item, index) => (
                <input
                  key={item.id}
                  placeholder={`${item.title}`}
                  {...register(`socials.${index}.value`)}
                  className="label-desc input input-bordered input-sm indent-2 bg-primary"
                />
              ))}
            </div>
          </div> */}

          <div className="col-span-full flex px-4 mt-12">
            <button className="btn btn-block bg-primary">Uppdatera</button>
          </div>
        </form>
      </div>
    </div>



  );
};

export default RestaurantEditCard;




// import React from "react";

// const RestaurantEditCard = ({ restaurant }) => {
// 	const social = (type) => {
// 		restaurant?.socials?.find((social) => {
// 			if (social?.title === type) return social.value;
// 		});
// 	};

// 	console.log(social());

// 	return (
// 		<div className="card lg:card-side bg-base-content shadow-xl h-full overflow-y-auto scrollbar-hide">
// 			<img src="https://placeimg.com/400/400/arch" alt="Album" />

// 			<div className="card-body flex flex-col items-stretch">
// 				<h2 className="card-title text-white self-center">Redigera haket</h2>
// 				<form className="flex flex-col gap-2">
// 					<input
// 						type="text"
// 						placeholder="Namn"
// 						defaultValue={restaurant.name}
// 						className="input input-bordered input-sm indent-2 bg-primary"
// 					/>

// 					<input
// 						type="text"
// 						placeholder="Adress"
// 						defaultValue={restaurant.address}
// 						className="input input-bordered input-sm indent-2 bg-primary"
// 					/>

// 					<input
// 						type="text"
// 						placeholder="Stad"
// 						defaultValue={restaurant.city}
// 						className="input input-bordered input-sm indent-2 bg-primary"
// 					/>

// 					<textarea
// 						cols="30"
// 						rows="10"
// 						placeholder="Beskrivning"
// 						defaultValue={restaurant.description}
// 						className="basis-full label-desc-text-area px-5 textarea textarea-bordered bg-primary"
// 					></textarea>

// 					<input
// 						type="text"
// 						placeholder="Typ av kök"
// 						defaultValue={restaurant.cuisine}
// 						className="input input-bordered input-sm indent-2 bg-primary"
// 					/>

// 					<input
// 						type="text"
// 						placeholder="Typ av matställe"
// 						defaultValue={restaurant.type_of_place}
// 						className="input input-bordered input-sm indent-2 bg-primary"
// 					/>

// 					<input
// 						type="text"
// 						placeholder="Utbud"
// 						defaultValue={restaurant.offers_food}
// 						className="input input-bordered input-sm indent-2 bg-primary"
// 					/>

// 					<input
// 						type="url"
// 						placeholder="hemsida"
// 						// defaultValue={restaurant.socials.}
// 						className="input input-bordered input-sm indent-2 bg-primary"
// 					/>

// 					<input
// 						type="email"
// 						placeholder="e-post"
// 						// defaultValue={restaurant.city}
// 						className="input input-bordered input-sm indent-2 bg-primary"
// 					/>

// 					<input
// 						type="tel"
// 						placeholder="tel"
// 						// defaultValue={restaurant.city}
// 						className="input input-bordered input-sm indent-2 bg-primary"
// 					/>

// 					<input
// 						type="url"
// 						placeholder="facebook"
// 						// defaultValue={restaurant.city}
// 						className="input input-bordered input-sm indent-2 bg-primary"
// 					/>

// 					<input
// 						type="url"
// 						placeholder="instagram"
// 						// defaultValue={restaurant.city}
// 						className="input input-bordered input-sm indent-2 bg-primary"
// 					/>

// 					<div className="card-actions justify-end">
// 						<button className="btn btn-primary">Change</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default RestaurantEditCard;
