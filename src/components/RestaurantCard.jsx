import { useState } from "react";
import useUploadImage from "../hooks/useUploadImage";

import Carousel from "./Carousel";
import Alert from "./Alert";
import placeholder from "../assets/images/placeholder-image.webp";
import {
  MdAddPhotoAlternate,
  MdOutlinePlace,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import {
	AiFillFacebook,
	AiOutlineGlobal,
	AiOutlineMail,
	AiFillPhone,
	AiFillInstagram,
	AiOutlineCloudUpload,
} from "react-icons/ai";
import { useAuthContext } from '../contexts/AuthContext'
import Directions from "./Directions";

const RestaurantCard = ({ restaurant, currentUser, isAdmin, showDistance }) => {

  const { showRestaurantCard, setShowRestaurantCard} = useAuthContext()
	let icon;
	const [image, setImage] = useState(null);
	const { uploadImage, uploadProgress, error, isSuccess, isError } =
		useUploadImage();

	const handleFileChange = (e) => {
		if (!e.target.files.length) {
			setImage(null);
			return;
		}

		setImage(e.target.files[0]);
	};

	const handleUpload = () => {
		if (!currentUser) {
			return alert("Du måste vara inloggad för att ladda upp en bild");
		}

		uploadImage(image, restaurant);
	};

	return (
    <div className="card card-compact rounded-none w-full lg:w-96 bg-base-100 shadow-xl scrollbar-thin scrollbar-thumb-base-content scrollbar-track-black">
      <div className="card-actions justify-end">
        <button
          className="btn btn-square btn-ghost btn-sm"
          onClick={() => setShowRestaurantCard(!showRestaurantCard)}>
          <MdOutlineKeyboardArrowRight className="hidden lg:grid" size={25} />
          <MdOutlineKeyboardArrowDown className="lg:hidden grid" size={25} />
        </button>
      </div>
      {restaurant?.photos?.length !== 0 ? (
        <Carousel restaurant={restaurant} />
      ) : (
        <img src={placeholder} alt="placeholder" />
      )}

      <div className="card-body">
        <div className="flex gap-4 items-center">
          <h2 className="card-title">{restaurant?.name}</h2>

          <span className="text-xs opacity-70 font-light">
            {showDistance(restaurant) &&
              `${Math.floor(showDistance(restaurant))} km från vald postion`}
          </span>

          <Directions restaurant={restaurant} />
        </div>

        <div className="upload-photo flex items-center justify-between">
          <label
            htmlFor="image"
            className="border border-base-content p-3 rounded-full self-start flex items-center gap-2">
            <MdAddPhotoAlternate size={25} />

            {image ? (
              <span className="text-gray-400 text-sm italic">
                {image.name} {Math.round(image.size / 1024)} kB
              </span>
            ) : (
              <span className="text-gray-400 text-sm italic">
                Ingen vald bild
              </span>
            )}

            <input
              type="file"
              id="image"
              className="mt-2 hidden"
              onChange={handleFileChange}
            />
          </label>

          {image && (
            <button className="btn btn-circle" onClick={handleUpload}>
              <AiOutlineCloudUpload size={25} />
            </button>
          )}
        </div>

        {uploadProgress !== null && (
          <progress
            className="progress progress-warning border border-base-content mt-4 w-full"
            value={uploadProgress}
            max="100"></progress>
        )}

        {isError && <Alert variant={"alert-error"} message={error.message} />}

        {isSuccess && isAdmin ? (
          <div className="alert alert-success shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Bilden har laddats upp!</span>
            </div>
          </div>
        ) : isSuccess && !isAdmin ? (
          <div className="alert alert-info shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current flex-shrink-0 w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Bilden kommer att granskas av admin.</span>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="divider"></div>

        <div className="flex">
          <div className="badge">{restaurant?.type_of_place}</div>
          <div className="badge">{restaurant?.offers_food}</div>
          <div className="badge">{restaurant?.cuisine}</div>
        </div>

        <div className="pt-4">
          <h3 className="font-bold">Recension</h3>
          <p>{restaurant?.description}</p>
        </div>

        <div className="divider"></div>

        <ul>
          <li key={restaurant.adress} className="p-2">
            <p className="text-xs inline-flex items-center">
              <MdOutlinePlace
                size={20}
                className="mr-2 cursor-pointer text-primary hover:text-error"
              />
              {restaurant.address}
            </p>
          </li>
          {restaurant?.socials?.map((element, i) => {
            if (element.value != "") {
              icon = element.title;
              switch (icon) {
                case "hemsida":
                  return (
                    <li key={i} className="p-2">
                      <p className="text-xs inline-flex items-center">
                        <AiOutlineGlobal
                          size={20}
                          className="mr-2 cursor-pointer text-primary hover:text-error"
                        />
                        {element.value}
                      </p>
                    </li>
                  );
                case "e-post":
                  return (
                    <li key={i} className="p-2">
                      <p className="text-xs inline-flex items-center">
                        <AiOutlineMail
                          size={20}
                          className="mr-2 cursor-pointer text-primary hover:text-error"
                        />
                        {element.value}
                      </p>
                    </li>
                  );
                case "tel":
                  return (
                    <li key={i} className="p-2">
                      <p className="text-xs inline-flex items-center">
                        <AiFillPhone
                          size={20}
                          className="mr-2 cursor-pointer text-primary hover:text-error"
                        />
                        {element.value}
                      </p>
                    </li>
                  );
                case "facebook":
                  return (
                    <li key={i} className="p-2">
                      <p className="text-xs inline-flex items-center">
                        <AiFillFacebook
                          size={20}
                          className="mr-2 cursor-pointer text-primary hover:text-error"
                        />
                        {element.value}
                      </p>
                    </li>
                  );
                case "instagram":
                  return (
                    <li key={i} className="p-2">
                      <p className="text-xs inline-flex items-center">
                        <AiFillInstagram
                          size={20}
                          className="mr-2 cursor-pointer text-primary hover:text-error"
                        />
                        {element.value}
                      </p>
                    </li>
                  );
                default:
                  <li key={i} className="p-2">
                    No socials available
                  </li>;
              }
            }
          })}
        </ul>

        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
};

export default RestaurantCard;
