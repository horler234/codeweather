import axios from "axios";

export const getCityImage = async (city: string) => {
  const proxyUrl = "https://cryptic-escarpment-65507.herokuapp.com/";
  const placesRequestUrl = `https://api.unsplash.com/search/photos?&query=${city.toLowerCase()}&client_id=${
    process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_KEY as string
  }`;
  const initialPlacesRequest: any = await axios
    .get(placesRequestUrl)
    .catch(console.error);
  //   const photoRef =
  //     initialPlacesRequest?.data?.candidates?.[0].photos?.[0]?.photo_reference;

  return initialPlacesRequest;

  //   if (photoRef) {
  //     const imageLookupURL = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${process.env.GOOGLE_API_KEY}&maxwidth=700&maxheight=700`;
  //     const imageURLQuery = await fetch(proxyUrl + imageLookupURL)
  //       .then((r) => r.blob())
  //       .catch(console.error);
  //     return URL.createObjectURL(imageURLQuery);
  //   }
};

export const getLandScapeImage = (data: any) => {
  return data.results.filter((item: any) => item.width > item.height);
};
