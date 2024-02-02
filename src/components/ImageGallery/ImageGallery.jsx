import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  if (images.length === 0) return <div>There are not any image here</div>;

  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <li key={image.webformatURL} className="ImageGalleryItem">
          <ImageGalleryItem {...image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
