import { signin } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
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

  // next router
  const router = useRouter();

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
        setEmail("");
      }
      if (error?.password) {
        setPasswordError(error.password);
        setPassword("");
      }
    } else
      try {
        await signin("credentials", {
          redirect: false,
          email,
          password,
        });
        router.push("/");
      } catch (err) {
        console.error("error logging in", err);
      }
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="og:description"
          content="Code Weather is web application for displaying the weather data of a particular city."
        />
        <meta name="og:image" content="/images/placeholder.jpeg" />
        <meta property="og:site_name" content="Code Weather" />
        {/* twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sign In | Code Weather" />
        <meta
          name="twitter:description"
          content="Code Weather is web application for displaying the weather data of a particular city."
        />
        <meta name="twitter:image" content="/images/placeholder.jpeg" />
        <title>Sign In | Code Weather</title>
      </Head>
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
    </>
  );
}
