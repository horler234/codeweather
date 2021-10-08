import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { AuthButton } from "../components/form/AuthButton";
import { AuthText } from "../components/form/AuthText";
import { ErrorText } from "../components/form/ErrorText";
import { Input } from "../components/form/Input";
import {
  PageWrapper,
  FormContainer,
} from "../components/page-styles/AuthStyle";
import { PostSignIn } from "../types/PostSignIn";
import { validateSignIn } from "../util/validate/validateSignIn";

export default function SignIn() {
  // error states
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SUBMIT EVENT
  const handleSignIn = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    // handle error states
    const { isValid, error } = validateSignIn({
      email,
      password,
    });

    if (!isValid) {
      if (error?.email) {
        setEmailError(error.email);
      }
      if (error?.password) {
        setPasswordError(error.password);
      }
    } else {
      console.log({ email, password });
    }

    try {
      const signInInfo: PostSignIn = {
        email,
        password,
      };

      //   const response = await fetch("/api/report-listing-error", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(errorInfo),
      //   });
      //   const json = await response.json();

      //   if (!json || json.error || !json.data || !json.data.wasSuccessful) {
      //     console.error("Fetch request to report-listing-error failed");
      //   } else {
      //     console.log("success");
      //   }
    } catch (err) {
      console.error("error logging in", err);
    }

    setEmail("");
    setPassword("");
  };
  return (
    <PageWrapper>
      <FormContainer>
        <h1>code.weather</h1>

        <form onSubmit={handleSignIn}>
          <Input
            placeholder="email"
            id="sign_in_email"
            label="email"
            onClick={() => emailError && setEmailError(null)}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {emailError && <ErrorText>{emailError}</ErrorText>}

          <Input
            placeholder="password"
            id="sign_in_password"
            label="password"
            onClick={() => passwordError && setPasswordError(null)}
            onChange={(e) => setPassword(e.target.value)}
            isPassword
            value={password}
          />
          {passwordError && <ErrorText>{passwordError}</ErrorText>}

          <AuthButton>login</AuthButton>
        </form>
        <AuthText>
          alien to this?{" "}
          <Link href="/signup">
            <a>signup</a>
          </Link>
        </AuthText>
      </FormContainer>
    </PageWrapper>
  );
}
