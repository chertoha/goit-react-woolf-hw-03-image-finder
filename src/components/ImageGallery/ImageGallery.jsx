import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';
import { Gallery, GalleryItem } from './ImageGallery.styled';

const ImageGallery = ({ images }) => {
  if (images.length === 0) return <div>There are not any image here</div>;

  return (
    <Gallery className="gallery">
      {images.map(image => (
        <GalleryItem key={image.webformatURL} className="ImageGalleryItem">
          <ImageGalleryItem {...image} />
        </GalleryItem>
      ))}
    </Gallery>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
