/**
 *
 * @param data geolocation data from addressAutocomplete
 * @returns formatted city name
 */

export const getCityName = (data: any) => {
  const cityNameArray = data[0].address_components.filter(
    (item: any) => item.types[0] === "administrative_area_level_1"
  );

  return cityNameArray[0].long_name;
};
