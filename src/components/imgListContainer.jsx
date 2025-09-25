import React from 'react';
import { Link } from "react-router-dom";


export default function ImageList({ images }) {
  return (
    <div id="block">
      {images.length > 0 ? (
        images.map((h) => (
          <Link
            key={h.id}
            to={`/image/${h.id}`}
            style={{ textDecoration: "none" }}
          >
            <img
              src={h.webformatURL}
              alt={h.tags}
              loading="lazy"
              style={{ width: "100%", height: 160, objectFit: "cover" }}
            />
          </Link>
        ))
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
}