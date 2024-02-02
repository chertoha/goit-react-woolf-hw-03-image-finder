import Modal from 'components/Modal';
import { Component } from 'react';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;
    const { webformatURL, largeImageURL, tags } = this.props;

    return (
      <>
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={tags}
          onClick={this.openModal}
        />

        {isModalOpen && (
          <Modal
            imgSrc={largeImageURL}
            label={tags}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
