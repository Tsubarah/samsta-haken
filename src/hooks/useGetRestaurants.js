import { orderBy } from "@firebase/firestore";
import { useEffect } from "react";
import useStreamCollection from "./useStreamCollection"

const useGetRestaurants = (sortQuery) => {

  useEffect(() => {
     if (sortQuery === "name") {
       return useStreamCollection("restaurants", orderBy("name"));
     } else {
       return useStreamCollection("restaurants");
     }
  }, [sortQuery])

}

export default useGetRestaurants