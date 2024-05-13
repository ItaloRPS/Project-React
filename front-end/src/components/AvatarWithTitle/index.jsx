import React from "react";
import * as Style from "./styles";

import { Avatar } from 'antd';
export const AvatarWithTitle = ({ children, srcImg , title, description , size}) => {
  return (
    <Style.Content>
        <Avatar size={64} src={srcImg} />
        <Style.Texts>
          <Style.Title>{title}</Style.Title>
          <Style.Description>{description}</Style.Description>
        </Style.Texts>
    </Style.Content>
  
  );
};
