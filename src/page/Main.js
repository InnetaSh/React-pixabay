import { useEffect, useState } from "react";
import '../style.css';
import ButtonComponent from "../components/buttonComponent.jsx";
import BtnContainerComponent from "../components/btnContainer.jsx";
import ImageList from "../components/imgListContainer.jsx";




const PER_PAGE = 24;

export default function Main() {
  const [searchQuery, setSearchQuery] = useState("cats");
  const [images, setImages] = useState([])
  const [imageType, setImageType]  = useState("photo");
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")



  async function fetchImages(term) {
    if (!term) return;
    setLoading(true);
    setErr("");
    try {
      const params = new URLSearchParams({
        key: process.env.REACT_APP_PIXABAY_KEY,
        q: term,
        image_type: imageType,
        safesearch: "true",
        per_page: String(PER_PAGE),
      });
      const res = await fetch(`https://pixabay.com/api/?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      data.hits.forEach((img, idx) => {
        console.log(`Image ${idx}:`, img.user);
      });
      setImages(data.hits || []);

    } catch (e) {
      setErr(e.message || "Ошибка загрузки");
      setImages([]);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => { fetchImages(searchQuery); }, [imageType]);

  const onSubmit = (e) => {
    e.preventDefault();
    fetchImages(searchQuery.trim());
  };









  return (
    <div id="App">
      <div className="header">
        <video id="backgroundVideo" autoPlay loop muted>
          <source src="img/hero3.mp4" type="video/mp4"></source>
        </video>
        <div className="header_container">
          <div id="logo">
            <div className="logo-image"></div>

            <div className="head_btn flex">
              <div className="white_btn">
                <select 
                  name="Panel_btnSearh"
                  value={imageType}
                  onChange ={(e)=>setImageType(e.target.value)}
                 >
                  <option value="Images" disabled>Images</option>
                  <optgroup label="Images">
                    <option value="all">all</option>
                    <option value="photo">photo</option>
                    <option value="illustration">illustration</option>
                    <option value="vector">vector</option>
                  </optgroup>
                  <option value="Videos">Videos</option>
                  <option value="Music">Music</option>
                  <option value="Sound Effects">Sound Effects</option>
                  <option value="GiFs">GiFs</option>
                  <option value="Users">GiFs</option>
                </select>
              </div>
              <ButtonComponent className="white_btn" name="LogIn" text="Log in" />
              <ButtonComponent className="white_btn" name="Join" text="Join" />
              <ButtonComponent className="btn" name="upload" text="upload" />
            </div>
          </div>
          <div className="Searh_Container">
            <div id="StartText">
              Stunning royalty-free images & royalty-free stock
            </div>
            <BtnContainerComponent 
              className="container_btns_SearhType"
              onTypeChange = {(type) =>setImageType(type)}
            />
            <div className="Searh" id="VvodSearh">
              <form onSubmit={onSubmit}>
                <button type="submit" id="btnSearh">
                  <div className="button-image"></div>
                </button>
                <input type="text"
                  name="textSearh"
                  placeholder="Search for free Images, Videos, Music & more"
                  value={searchQuery}  
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="main"></div>
      <div id="block_head">
        <div id="blc1"></div>
        <div id="blc2">

        </div>
      </div>
      <div id="coundFind"></div>
      <ImageList images={images} />

    </div>
  );
}


