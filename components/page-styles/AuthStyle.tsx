import styled from "styled-components";

/**
 * Styles for the authentication pages i.e. sign in and sign up page
 */

export const PageWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  width: 90%;
  max-width: 400px;

  h1 {
    color: #28292f;
    text-align: center;
    margin-bottom: 40px;
  }
`;
