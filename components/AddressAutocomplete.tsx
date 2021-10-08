import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { Dispatch, SetStateAction } from "react";

type AddressAutocompleteProps = { onChange: Dispatch<SetStateAction<null>> };

export const AddressAutocomplete = ({ onChange }: AddressAutocompleteProps) => (
  <GooglePlacesAutocomplete
    apiKey={process.env.GOOGLE_API_KEY as string}
    selectProps={{
      onChange,
      placeholder: "Search location",
      styles: {
        container: (provided: Object) => ({
          ...provided,
          padding: 0,
        }),

        menu: (provided: Object) => ({
          ...provided,
          backgroundColor: "#ffffff",
        }),

        menuList: (provided: Object) => ({
          ...provided,
          fontSize: 14,
        }),

        control: (provided: Object, state: any) => ({
          ...provided,
          backgroundColor: "transparent",
          transition: "background .6s ease",
          cursor: "text",
          borderRadius: "none",
          minHeight: "auto",
          boxShadow: 0,
          border: "none",
          borderBottom: "1px solid #8f9094",
          color: "#fff",
          "&:hover": {
            borderBottom: "1px solid #8f9094",
          },
        }),

        placeholder: (provided: Object) => ({
          ...provided,
          fontWeight: 400,
          fontSize: 14,
          color: "#8F9094",
        }),

        indicatorsContainer: (provided: Object) => ({
          ...provided,
          display: "none",
        }),

        input: (provided: Object) => ({
          ...provided,
          width: "100%",
          fontWeight: 400,
          fontSize: 14,
          padding: 10,
          paddingLeft: 0,
          color: "#fff",
        }),

        singleValue: (provided: Object) => ({
          ...provided,
          fontSize: 14,
        }),
      },
    }}
  />
);
