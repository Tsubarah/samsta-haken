import { BiReplyAll } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineGlobal } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillPhone } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";


const RestaurantCard = ({ restaurant }) => {
  // const [showRestaurantCard, setShowRestaurantCard] = useState(false)
  console.log(restaurant);
  let icon;

  return (
    <div className="card card-compact restaurant-card grow rounded-none lg:w-96 w-full h-full bg-base-100 shadow-xl overflow-y-auto scrollbar-hide">
      <div className="col-span-full lg:hidden grid grid-rows-2">
        <MdOutlineCancel
          size={15}
          className="cursor-pointer justify-self-end text-primary hover:text-error"
        />
      </div>
      <figure>
        <img src="https://placeimg.com/400/225/arch" alt="Restaurant" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{restaurant.name}</h2>
        <div className="divider"></div>
        <div className="flex">
          <div className="badge">{restaurant.type_of_place}</div>
          <div className="badge">{restaurant.offers_food}</div>
          <div className="badge">{restaurant.cuisine}</div>
        </div>
        <div className="pt-4">
          <h3 className="font-bold">Recension</h3>
          <p>{restaurant.description}</p>
        </div>

        <div className="divider"></div>

        <ul>
          {restaurant.socials.map((element, i) => {
            console.log("ELment: ", element.value);
            if (element.value != "") {
              icon = element.title;
              switch (icon) {
                case "hemsida":
                  return (
                    <li className="p-2" key={i}>
                      <p className="text-xs inline-flex">
                        <AiOutlineGlobal
                          size={20}
                          className="mr-2 cursor-pointer text-primary hover:text-error"
                        />{" "}
                        {element.value}
                      </p>
                    </li>
                  );
                  break;
                case "e-post":
                  return (
                    <li className="p-2" key={i}>
                      <p className="text-xs inline-flex">
                        <AiOutlineMail
                          size={20}
                          className="mr-2 cursor-pointer text-primary hover:text-error"
                        />
                        {element.value}
                      </p>
                    </li>
                  );
                  break;
                case "tel":
                  return (
                    <li className="p-2" key={i}>
                      <p className="text-xs inline-flex">
                        <AiFillPhone
                          size={20}
                          className="mr-2 cursor-pointer text-primary hover:text-error"
                        />{" "}
                        {element.value}
                      </p>
                    </li>
                  );
                  break;
                case "facebook":
                  return (
                    <li className="p-2" key={i}>
                      <p className="text-xs inline-flex">
                        <AiFillFacebook
                          size={20}
                          className="mr-2 cursor-pointer text-primary hover:text-error"
                        />
                        {element.value}
                      </p>
                    </li>
                  );
                  break;
                case "instagram":
                  return (
                    <li className="p-2" key={i}>
                      <p className="text-xs inline-flex">
                        <AiFillInstagram
                          size={20}
                          className="mr-2 cursor-pointer text-primary hover:text-error"
                        />
                        {element.value}
                      </p>
                    </li>
                  );
                  break;
                default:
                  <li className="p-2">No socials available</li>;
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
