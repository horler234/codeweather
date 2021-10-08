import { validateEmail } from "./validateEmail";
import { validateText } from "./validateText";

type ValidateSignUpProps = {
  email: string;
  userName: string;
  password: string;
};

type SignUpValidityObj = {
  isValid: boolean;
  error?: {
    email?: string;
    userName?: string;
    password?: string;
  };
};

/**
 * validateSignUp checks all fields in sign up to see if they are valid.
 *
 * Returns object with error messages for fields that contain errors.
 *
 * @param ValidateSignUpProps
 */
export function validateSignUp({
  email,
  password,
  userName,
}: ValidateSignUpProps) {
  const e = validateEmail(email);
  const n = validateText(userName, { minLength: 3 });
  const p = validateText(password, { minLength: 6 });

  const v: SignUpValidityObj = {
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

  if (!n.isValid) {
    v.isValid = false;
    v.error = {
      ...v.error,
      userName: n.error,
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
