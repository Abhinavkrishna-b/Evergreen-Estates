import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  const [sliderIndex, setSliderIndex] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (sliderIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [sliderIndex]);

  const openSlider = (index) => setSliderIndex(index);
  const closeSlider = () => setSliderIndex(null);

  const changeSlide = (direction, e) => {
    e.stopPropagation(); // Prevent closing when clicking arrows
    let newIndex;
    if (direction === 'prev') {
      newIndex = sliderIndex === 0 ? images.length - 1 : sliderIndex - 1;
    } else {
      newIndex = sliderIndex === images.length - 1 ? 0 : sliderIndex + 1;
    }
    setSliderIndex(newIndex);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="image-gallery-container">
      
      {/* Visual Grid Layout */}
      <div className="gallery-grid">
        {/* Main large image */}
        <div className="main-image-wrapper" onClick={() => openSlider(0)}>
          <img src={images[0]} alt="Property Main" className="gallery-img" />
          <div className="img-overlay"></div>
        </div>

        {/* 3 Thumbnails stacked on the right */}
        <div className="thumbnail-wrapper">
          {images.slice(1, 4).map((img, idx) => (
            <div 
              key={idx} 
              className="thumb-item" 
              onClick={() => openSlider(idx + 1)}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="gallery-img" />
              <div className="img-overlay"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Slider Modal */}
      {sliderIndex !== null && (
        <div className="slider-modal" onClick={closeSlider}>
          
          <button className="close-slider-btn" onClick={closeSlider}>
            <FiX />
          </button>
          
          <button className="nav-arrow left" onClick={(e) => changeSlide('prev', e)}>
            <FiChevronLeft />
          </button>
          
          <div className="slider-image-container" onClick={(e) => e.stopPropagation()}>
            <img src={images[sliderIndex]} alt={`Slide ${sliderIndex}`} />
            <div className="slider-counter">
              {sliderIndex + 1} / {images.length}
            </div>
          </div>
          
          <button className="nav-arrow right" onClick={(e) => changeSlide('next', e)}>
            <FiChevronRight />
          </button>
          
        </div>
      )}
    </div>
  );
};

export default ImageGallery;