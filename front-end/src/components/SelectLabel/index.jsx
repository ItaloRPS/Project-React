import React from "react";
import * as Style from "./styles";
import {Select} from 'antd';
export const SelectLabel = ({field, options=[], text, disabled=false, onChange, error="",value}) => {

  const filtroPorLabel = (input, opcao) =>
  opcao.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  return (
  <Style.Content error={error}>
     <Style.Label>{`${text}:`}</Style.Label>
     <Select {...field} allowClear showSearch optionFilterProp="label"  disabled={disabled} onChange={onChange}  {...value} options={options}/>
      {error&&<Style.Error>{error}</Style.Error>}
    </Style.Content>
  
  );
};
