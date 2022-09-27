import { MdAddPhotoAlternate } from "react-icons/md";
import Slider from '../components/Slider'
import { useState } from 'react'
import useGetCollection from "../hooks/useGetCollection";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

const RestaurantCard = ({ data }) => {
  const [image, setImage] = useState(false);
  const { uploadRestaurantImages } = useAuthContext()

  const handleFileChange = (e) => {
    if (!e.target.files.length) {
      setImage(null);
      return;
    }

    setImage(e.target.files[0])
    // restaurant: data.id});
    console.log("File changed!", e.target.files[0]);

  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Testing")

    await uploadRestaurantImages(data.id, image)

  }

  const restaurantPhotos = data.photos

  return (
    <>
      <div className="card max-h-50 card-side p-1 mt-0.5 bg-base-content shadow-xl">
        <div className="flex flex-col">
          <div className="card-body p-2">
            <div className="collapse col-span-12 justify-start">
              <input type="checkbox" />
              <div className="collapse-title p-0 flex justify-between text-lg font-medium">
                {/* <img
                  src="https://placeimg.com/200/280/arch"
                  alt="restaurant"
                /> */}
                <div className="card-title">{data.name}</div>
              </div>

              <div className="collapse-content">
                <p className="font-bold">Why this place is terrible</p>
                <p>{data.description}</p>
                <br />

                <p className="text-sm">{data.cuisine}</p>
                <p className="text-sm">{data.city}</p>
                <p className="text-sm">{data.offers_food}</p>
                <p className="text-sm">{data.address}</p>
                <br />

                <div className="p-2">
                  <Slider data={restaurantPhotos} />
                </div>

                <form className="form-control" onSubmit={handleSubmit}>
                  <label
                    htmlFor="image"
                    className="border border-grey-light p-3 w-10 rounded-full items-center gap-2 text-sm">
                    <MdAddPhotoAlternate size={15} className="text-gray-400" />
                    <input
                      type="file"
                      id="image"
                      className="mt-2 hidden"
                      onChange={handleFileChange}
                    />
                    {image ? (
                      `${image.name} (${Math.round(image.size / 1024)} kB)`
                    ) : (
                      <span className="text-gray-400 text-sm italic"></span>
                    )}
                  </label>
                  <button className="bg-primary" type="submit">
                    Upload
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantCard;
