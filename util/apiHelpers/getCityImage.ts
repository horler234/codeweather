import axios from "axios";

export const getCityImage = async (city: string) => {
  const proxyUrl = "https://cryptic-escarpment-65507.herokuapp.com/";
  const placesRequestUrl = `https://api.unsplash.com/search/photos?&query=${city.toLowerCase()}&client_id=${
    process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_KEY as string
  }`;
  const initialPlacesRequest: any = await axios
    .get(placesRequestUrl)
    .catch(console.error);

  return initialPlacesRequest;
};

export const getLandScapeImage = (data: any) => {
  return data.results.filter((item: any) => item.width > item.height);
};
