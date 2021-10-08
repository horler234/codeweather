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
import { PostSignUp } from "../types/PostSignUp";
import { validateSignUp } from "../util/validate/validateSignUp";

export default function SignUp() {
  // error states
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // form values
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // SUBMIT EVENT
  const handleSignUp = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    // handle error states
    const { isValid, error } = validateSignUp({
      email,
      userName: name,
      password,
    });

    if (!isValid) {
      if (error?.email) {
        setEmailError(error.email);
      }
      if (error?.userName) {
        setNameError(error.userName);
      }
      if (error?.password) {
        setPasswordError(error.password);
      }
    } else {
      try {
        const signUpInfo: PostSignUp = {
          email,
          name,
          password,
          date_created: new Date(),
          search: [],
        };

        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpInfo),
        });
        const json = await response.json();

        if (!json || json.error) {
          console.error("Fetch request to sign up failed", json);
          if (json.error.email) setEmailError(json.error.email);
        } else {
          console.log("success", json);
        }
      } catch (err) {
        console.error("error logging in", err);
      }
    }

    setEmail("");
    setName("");
    setPassword("");
  };
  return (
    <PageWrapper>
      <FormContainer>
        <h1>code.weather</h1>

        <form onSubmit={handleSignUp}>
          <Input
            placeholder="email"
            id="sign_up_email"
            label="email"
            onClick={() => emailError && setEmailError(null)}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {emailError && <ErrorText>{emailError}</ErrorText>}

          <Input
            placeholder="username"
            id="sign_up_username"
            label="username"
            onClick={() => nameError && setNameError(null)}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {nameError && <ErrorText>{nameError}</ErrorText>}

          <Input
            placeholder="password"
            id="sign_up_password"
            label="password"
            onClick={() => passwordError && setPasswordError(null)}
            onChange={(e) => setPassword(e.target.value)}
            isPassword
            value={password}
          />
          {passwordError && <ErrorText>{passwordError}</ErrorText>}

          <AuthButton>sign up</AuthButton>
        </form>
        <AuthText>
          been here for a while?{" "}
          <Link href="/signin">
            <a>signin</a>
          </Link>
        </AuthText>
      </FormContainer>
    </PageWrapper>
  );
}
