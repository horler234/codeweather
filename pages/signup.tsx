import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { AuthButton } from "../components/form/AuthButton";
import { AuthText } from "../components/form/AuthText";
import { Input } from "../components/form/Input";
import {
  PageWrapper,
  FormContainer,
} from "../components/page-styles/AuthStyle";

export default function SignUp() {
  return (
    <PageWrapper>
      <FormContainer>
        <h1>code.weather</h1>

        <form>
          <Input placeholder="email" id="sign_up_email" label="email" />
          <Input
            placeholder="username"
            id="sign_up_username"
            label="username"
          />
          <Input
            placeholder="password"
            id="sign_up_password"
            label="password"
            isPassword
          />

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
