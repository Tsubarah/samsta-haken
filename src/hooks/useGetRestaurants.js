import useStreamCollection from "./useStreamCollection"

const useGetRestaurants = () => {
  return useStreamCollection('restaurants')
}

export default useGetRestaurants