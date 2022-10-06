import useStreamCollection from "./useStreamCollection"

const useGetRestaurants = (isAdmin) => {
  return useStreamCollection('restaurants', isAdmin)
}

export default useGetRestaurants