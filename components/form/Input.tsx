import { useState } from "react";
import styled from "styled-components";
import { HiddenLabel } from "./HiddenLabel";

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  margin-top: 20px;
  input {
    width: 100%;
    border: 2px solid #28292f;
    padding: 20px 10px;
    border-radius: 2px;
    background: none;
    font-size: 16px;
    line-height: 18.75px;
    font-family: inherit;
  }
`;

/**
 * InputProps contains the props used in the input components
 * @param label label text
 * @param placeholder placeholder text in the input field
 * @param text input value
 * @param id id of the input and also the "for" attribute of the label
 * @param onChange function fired when a user types in the input field
 */

interface InputProps {
  label: string;
  placeholder: string;
  id: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (evt: React.MouseEvent<HTMLInputElement>) => void;
  value?: string;
  isPassword?: boolean;
}

export const Input = ({
  onChange,
  onClick,
  label,
  placeholder,
  id,
  value,
  isPassword,
}: InputProps) => {
  return (
    <InputWrapper>
      <HiddenLabel>{label}</HiddenLabel>
      <input
        type={isPassword ? "password" : "text"}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onClick={onClick}
      />
    </InputWrapper>
  );
};
