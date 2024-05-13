import React from "react";
import * as Style from "./styles";
import {DatePicker} from 'antd';
export const DatePickerLabel = ({ value,text, onChange , disabled= false, placeholder ,error="", field, defaultChecked}) => {

  return (
  <Style.Content error={error}>
     <Style.Label>{`${text}:`}</Style.Label>
     <DatePicker 
      size="large" 
      format={['DD/MM/YYYY']} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      defaultChecked={defaultChecked}
      {...field}
    />
      {error&&<Style.Error>{error}</Style.Error>}
    </Style.Content>
  
  );
};
