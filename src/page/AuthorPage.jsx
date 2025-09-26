import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import '../style.css';
import ButtonComponent from "../components/buttonComponent.jsx";
import BtnContainerComponent from "../components/btnContainer.jsx";
import ImageList from "../components/imgListContainer.jsx";
import HeaderComponent from "../components/HeaderComponent.jsx";

const PER_PAGE = 24;
const MAX_PAGES = 1;

export default function AuthorPage() {
  const { authorParam } = useParams();
  const location = useLocation();

  const tagFromState = location.state?.tags || "";
  const logo = location.state?.logo || "";
  const cleanedTag = tagFromState.split(",")[0].trim();

  const [authorName, authorId] = authorParam.split("-");
  const [images, setImages] = useState([]);
  const [imageType, setImageType] = useState("photo");
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

 

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
  

  useEffect(() => {
    async function fetchAllImagesByAuthor() {
      if (!authorId) {
        setErr("Некорректный ID автора");
        return;
      }

      setLoading(true);
      setErr("");
      let allImages = [];

      try {
        for (let page = 1; page <= MAX_PAGES; page++) {
          const params = new URLSearchParams({
            key: process.env.REACT_APP_PIXABAY_KEY,
            q: cleanedTag || "cats",
            image_type: imageType,
            safesearch: "true",
            per_page: String(PER_PAGE),
            page: String(page),
          });

          const res = await fetch(`https://pixabay.com/api/?${params.toString()}`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          const data = await res.json();
          if (!data.hits || data.hits.length === 0) break;


          let filtered = data.hits.filter(img => {
            if (!img.user_id) return false;
            return img.user_id === Number(authorId);
          });


          console.log(data.hits);
          data.hits.forEach((img, idx) => {
            console.log(`Image ${idx}:`, img.user_id);
          });
          console.log(authorId);
          allImages = [...allImages, ...filtered];



        }

        setImages(allImages);
        if (allImages.length === 0) {
          setErr("Изображения автора не найдены");
        }
      } catch (e) {
        setErr(e.message || "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    }

    fetchAllImagesByAuthor();
  }, [authorId]);

  return (
    <div id="App">
<HeaderComponent
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  onSubmit={onSubmit}
  imageType={imageType}
  setImageType={setImageType}
  showBtnContainer={false}
/>
<div className="author-detail-main">


      <div className="author-detail">
        <img
          src={logo}
          alt='logo'
        />
        <h1 >
          {authorName}
        </h1>
      </div>
      <div id="block_head">
        <div id="blc1"></div>
        <div id="blc2"></div>
      </div>
      <div id="coundFind"></div>

      {loading && <p>Loading images...</p>}
      {err && <p style={{ color: "red" }}>{err}</p>}
      {!loading && !err && images.length === 0 && <p>No images found for this author.</p>}

      <ImageList images={images} />
    </div>
    </div>
  );
}
