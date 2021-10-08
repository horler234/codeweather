import { AuthError } from "../../types/AuthError";

export const handleAuthErrors = (err: any) => {
  const errors: AuthError = { name: "", email: "", password: "" };

  console.log(err);

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "This email is already registered";

    return errors;
  }

  return errors;
};
