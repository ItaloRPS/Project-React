import React, { useEffect, useState } from "react";
import * as Style from "./styles";
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill';


export const Richeditor = ({ text, value, onChange , disabled= false, error="", register}) => {
  useEffect(() => {
    const headingButton = document.querySelector('.ql-picker-item[data-value="1"]');
    if (headingButton) {
      console.log(headingButton.content)
      console.log(headingButton.style )
    }
  }, []);
  return (
  <Style.Content>
     {text&&<Style.Label>{`${text}:`}</Style.Label>}
     <ReactQuill
        {...register}
        theme="snow" // Pode ser 'snow' ou 'bubble'
        value={value}
        onChange={onChange}
            />
      {error&&<Style.Error>{error}</Style.Error>}
    </Style.Content>
  
  );
};
