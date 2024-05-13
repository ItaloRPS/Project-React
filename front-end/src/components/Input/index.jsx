import React, { useState } from "react";
import * as Style from "./styles";
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'

export const Input = ({ type, text, placeholder, value, onChange, onKeyPress, disabled=false,maxLength=255, error="", register}) => {
  const [passwordVisible ,setPasswordVisible] = useState(false)
  return (
  <Style.Content>
     {text&&<Style.Label>{`${text}:`}</Style.Label>}
     <Style.Span  error={error}>
      <Style.Input
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        type={type==="password"&&!passwordVisible?"password":'text'}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        {...register}
      />
      {type==="password"&&(passwordVisible?<AiOutlineEye onClick={()=>setPasswordVisible((false))}/>:<AiOutlineEyeInvisible onClick={()=>setPasswordVisible(true)}/>)}
    </Style.Span>
      {error&&<Style.Error>{error}</Style.Error>}
    </Style.Content>
  
  );
};
