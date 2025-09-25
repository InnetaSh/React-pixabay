import React from "react";
 
export default function ButtonComponent({ className, name,text }) {
    return <button type="button" className={className} name={name}>{text}</button>;
}