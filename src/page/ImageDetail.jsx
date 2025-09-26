// src/page/ImageDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import '../style.css';
import ButtonComponent from "../components/buttonComponent.jsx";
import BtnContainerComponent from "../components/btnContainer.jsx";
import ImageList from "../components/imgListContainer.jsx";




const PER_PAGE = 24;

export default function Main() {
  const [searchQuery, setSearchQuery] = useState("cats");
  const [image, setImage] = useState([]);
  const { id } = useParams();
  const [imageType, setImageType] = useState("photo");

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem("comments");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    async function fetchImage() {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({
          key: process.env.REACT_APP_PIXABAY_KEY,
        });
        const res = await fetch(`https://pixabay.com/api/?id=${id}&${params}`);
        const data = await res.json();
        if (data.hits && data.hits.length > 0) {
          setImage(data.hits[0]);
        } else {
          setError("Image not found");
        }
      } catch (e) {
        setError("Failed to load image");
      } finally {
        setLoading(false);
      }
    }

    fetchImage();
  }, [id]);


  async function fetchAllImages(term) {
    if (!term) return;
    setLoading(true);
    setError("");
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
      setError(e.message || "Ошибка загрузки");
      setImages([]);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const onSubmitComment = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const newComment = {
      id: Date.now(),
      text: searchQuery.trim(),
    };

    setComments([newComment, ...comments]);
    setSearchQuery(""); // очищаем поле ввода
  };



  const onSubmit = (e) => {
    e.preventDefault();
    fetchAllImages(searchQuery.trim());
  };





  return (
    <div style={{ padding: 20 }} >
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : !image ? (
        <p>No image data.</p>
      ) : (
        <>
          <div className="imgDetail-header-section">

            <div id="logo">
              <div className="logo-image-dark"></div>
            </div>

            <div className="imgDetail-Searh_Container">
              <div className="Searh Searh-small Searh_Container-dark" id="VvodSearh">
                <form onSubmit={onSubmit}>
                  <button type="submit" id="btnSearh">
                    <div className="button-image-dark "></div>
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


            <div className="head_btn flex ">
              <div className="white_btn Searh_text-dark">
                <select
                  className="Searh_text-dark"
                  name="Panel_btnSearh"
                  value={imageType}
                  onChange={(e) => setImageType(e.target.value)}
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
              <ButtonComponent className="white_btn Searh_text-dark" name="LogIn" text="Log in" />
              <ButtonComponent className="white_btn Searh_text-dark" name="Join" text="Join" />
              <ButtonComponent className="btn" name="upload" text="upload" />
            </div>

          </div>
          <div className="imgDetail-container">

            <div className="imgDetail-img-section">
              <div className="img-section">
                <img
                  src={image.largeImageURL}
                  alt={image.tags}
                  style={{ width: "100%", maxWidth: 800 }}
                />
              </div>

              <p><b>Tags: </b>{image.tags}</p>
              <p ><b> {image.comments} comments </b></p>
              <form onSubmit={onSubmitComment}>
                <div className="flex">
                  <span className="input-logo">👤</span>
                  <input type="text"
                    name="textSearh"
                    placeholder="Add your comments..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <button className="btn btn-comment" name="upload">Comment</button>
              </form>
              <div className="comments-list">
                {comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    💬 {comment.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <div className="btn-left-section">
                  <button
                    className="btn"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = image.largeImageURL;
                      link.download = 'image.jpg';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    Download
                  </button>
                </div>


              <div className="flex">
                <p className="btn-grey"> ❤️ {image.likes}</p>
                <p className="btn-grey">Save: {image.downloads}</p>
                <p className="btn-grey">💬 {image.comments}</p>
              </div>
              <div className="flex">
                <p >Views:</p>
                <p >{image.views}</p>
              </div>
              <div className="flex">
                <p >Downloads: </p>
                <p >{image.downloads}</p>
              </div>
              <p>Resolution: {image.imageWidth}x{image.imageHeight}</p>

              <div className="author-section">
                <img
                  src={image.userImageURL}
                  alt={image.tags}
                  style={{ width: "50px", height: '50px' }}
                />
                <p>
                  <Link
                    to={`/author/${image.user}-${image.user_id}`}
                    state={{ tags: image.tags , logo:image.userImageURL}}
                  >
                    {image.user}
                  </Link>

                </p>
              </div>


            </div>
          </div>
        </>
      )}
    </div>
  );
}
