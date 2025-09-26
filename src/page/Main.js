import { useEffect, useState } from "react";
import '../style.css';
import ButtonComponent from "../components/buttonComponent.jsx";
import BtnContainerComponent from "../components/btnContainer.jsx";
import ImageList from "../components/imgListContainer.jsx";
import HeaderComponent from "../components/HeaderComponent.jsx";



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
      
      <HeaderComponent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSubmit={onSubmit}
          imageType={imageType}
          setImageType={setImageType}
          showBtnContainer={true}  
          videoSrc="img/hero3.mp4"
        />
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


