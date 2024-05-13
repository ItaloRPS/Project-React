import React from "react";
import * as Style from "./styles";

export const Textarea = ({id, text, placeholder, value, onChange, disabled= false, error="", cols, rows, register}) => {
  return (
  <Style.Content>
     <Style.Label>{`${text}:`}</Style.Label>
     <Style.Textarea
        onChange={onChange}
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        cols={cols}
        rows={rows}
        {...register}
    />
      {error&&<Style.Error>{error}</Style.Error>}
    </Style.Content>
  
  );
};
