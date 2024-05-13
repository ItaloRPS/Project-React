import React from "react";
import * as Style from "./styles";
import Input from 'react-input-mask' 


export const InputMask = ({ type, text, placeholder, value, onChange, disabled= false, error="", mask, register}) => {
  return (
  <Style.Content error={error} >
     {text&&<Style.Label>{`${text}:`}</Style.Label>}
     <Input mask={mask} disabled={disabled} {...register}>
     {(inputProps) => (
      <Style.Input 
        {...inputProps}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
          />
        )}
      </Input>
      {error&&<Style.Error>{error}</Style.Error>}
    </Style.Content>
  
  );
};
