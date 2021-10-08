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

export default function SignIn() {
  return (
    <PageWrapper>
      <FormContainer>
        <h1>code.weather</h1>

        <form>
          <Input placeholder="email" id="sign_in_email" label="email" />
          <Input
            placeholder="password"
            id="sign_in_password"
            label="password"
            isPassword
          />

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
