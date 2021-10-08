import { ValidityObj } from "./ValidityObj";
import isEmail from "validator/lib/isEmail";

/**
 * validateEmail checks to see if string is  valid email.
 *
 * @param email
 */
export const validateEmail = (email: string): ValidityObj => {
  if (email.trim().length < 5) {
    return {
      isValid: false,
      error: "Enter a valid email.",
    };
  }

  if (isEmail(email)) {
    return {
      isValid: true,
    };
  }

  return {
    isValid: false,
    error: "Enter a valid email.",
  };
};
