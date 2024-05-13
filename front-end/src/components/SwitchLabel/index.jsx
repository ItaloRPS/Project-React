import React from "react";
import * as Style from "./styles";
import {Switch} from 'antd';
export const SwitchLabel = ({ value,text, onChange , disabled= false, checked, error="", field, defaultChecked}) => {
  return (
  <Style.Content error={error}>
     <Style.Label>{`${text}:`}</Style.Label>
     <Switch
     value={value}
      checked={checked}
      disabled={disabled}
      defaultChecked={defaultChecked}
      {...field}
      onChange={onChange}
    />
      {error&&<Style.Error>{error}</Style.Error>}
    </Style.Content>
  
  );
};
