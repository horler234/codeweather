import { validateEmail } from "./validateEmail";
import { validateText } from "./validateText";

type ValidateSignInProps = {
  email: string;
  password: string;
};

type SignInValidityObj = {
  isValid: boolean;
  error?: {
    email?: string;
    password?: string;
  };
};

/**
 * validateSignIn checks all fields in sign in to see if they are valid.
 *
 * Returns object with error messages for fields that contain errors.
 *
 * @param ValidateSignInProps
 */
export function validateSignIn({ email, password }: ValidateSignInProps) {
  const e = validateEmail(email);
  const p = validateText(password, { minLength: 6 });

  const v: SignInValidityObj = {
    isValid: true,
    error: undefined,
  };

  if (!e.isValid) {
    v.isValid = false;
    v.error = {
      ...v.error,
      email: "Enter a valid email.",
    };
  }

  if (!p.isValid) {
    v.isValid = false;
    v.error = {
      ...v.error,
      password: p.error,
    };
  }

  return v;
}
