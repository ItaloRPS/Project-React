import React from "react";
import * as Style from "./styles";

export const InputCheck = ({ children, placeholder, checked=false, onChange , disabled= false, error="", register}) => {
  return (
  <Style.Content>
     <Style.Label>
      <Style.Input
        type="checkbox"
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        {...register}/>
        {children}
      </Style.Label>
      {error&&<Style.Error>{error}</Style.Error>}
    </Style.Content>
  
  );
};
