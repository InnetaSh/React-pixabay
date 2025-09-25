import React from "react";
 
export default function ButtonComponentId({ className, name,id,text , onClick}) {
    return <button type="button" 
        className={className}
        name={name}
        id={id}
        onClick={onClick}
      >{
        text}
      </button>;
}