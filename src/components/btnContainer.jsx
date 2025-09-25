import React from "react";
import ButtonComponentId from "./buttonComponentId.jsx"; 
 
export default function BtnContainerComponent({ className, onTypeChange}) {

  const handleClick = (type)=>{
    if (onTypeChange) onTypeChange(type);
  
  };


    return <div className={className}>
      <ButtonComponentId className="white_btn" name="Explore" id="Explore" text ="Explore" onClick={()=>handleClick("all")} />   
      <ButtonComponentId className="white_btn" name="Photos" id="Photos" text ="Photos" onClick={()=>handleClick("photo")} />   
      <ButtonComponentId className="white_btn" name="Illustrations" id="Illustrations" text ="Illustrations" onClick={()=>handleClick("illustration")} />    
      <ButtonComponentId className="white_btn" name="Vectors" id="Vectors" text ="Vectors" onClick={()=>handleClick("vector")} />   
      <ButtonComponentId className="white_btn" name="Video" id="Video" text ="Video" onClick={()=>handleClick("video")} />   
      <ButtonComponentId className="white_btn" name="Music" id="Music" text ="Music" onClick={()=>handleClick("Music")} />   
      <ButtonComponentId className="white_btn" name="SoundEffects" id="SoundEffects" text ="MusSound Effectsic" onClick={()=>handleClick("Sound Effects")} />   
      <ButtonComponentId className="white_btn" name="GiFs" id="GiFs" text ="GiFs" onClick={()=>handleClick("giFs")} />   
  </div>
}