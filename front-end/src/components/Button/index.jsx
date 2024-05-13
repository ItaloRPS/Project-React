import React from "react";
import * as Style from "./styles";

export const Button = ({ children, onClick, type="button", disabled=false, color='into'}) => {
 
  return (
    <Style.Button type={type} onClick={onClick} disabled={disabled} color={color} >
      {children}
    </Style.Button>
  );
};
