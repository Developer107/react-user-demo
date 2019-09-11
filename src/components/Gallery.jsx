import React from 'react';
import DefaultImage from '../images/default.png';

const Gallery = ({ items }) => (
  <div>
    {
            !!items && !!items.length
              ? items.map((photo) => (
                <div
                  key={`image${photo.id}`}
                  className="image-gallery"
                  style={{ backgroundImage: `url(${photo.url})` }}
                />
              ))
              : (
                <div
                  key="default-image"
                  className="image-gallery"
                  style={{ backgroundImage: `url(${DefaultImage})` }}
                />
              )

        }
  </div>
);

export default Gallery;
