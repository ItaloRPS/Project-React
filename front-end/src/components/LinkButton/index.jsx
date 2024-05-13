import React from "react";
import * as Style from "./styles";
import { Link } from "react-router-dom";
export const LinkButton = ({ children, to, color='into'}) => {
  return (
    <Style.Content color={color}>
        <Link to={to}>{children}</Link>
    </Style.Content>
  );
};
