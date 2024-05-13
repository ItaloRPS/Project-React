import React from "react";
import * as Style from "./styles";

export const Fieldset = ({ children, title , overflow='auto'}) => {
  return (
  <Style.Content overflow={overflow}>
     <Style.Title>{title}</Style.Title>
      {children}
    </Style.Content>
  
  );
};
