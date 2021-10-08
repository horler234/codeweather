import { ValidityObj } from "./ValidityObj";

/**
 * validateText checks to see if string is not empty,
 * and optionally checks for min and max length requirements.
 *
 *
 * @param text
 * @param options min and max length
 */
export function validateText(
  text: string,
  options?: { minLength?: number; maxLength?: number }
): ValidityObj {
  if (!text.trim()) {
    return {
      isValid: false,
      error: "Required.",
    };
  }

  if (options && options.minLength && text.trim().length < options.minLength) {
    return {
      isValid: false,
      error: "Minimum length is " + options.minLength,
    };
  }

  if (options && options.maxLength && text.trim().length > options.maxLength) {
    return {
      isValid: false,
      error: "Maximum length is " + options.maxLength,
    };
  }

  return {
    isValid: true,
  };
}
