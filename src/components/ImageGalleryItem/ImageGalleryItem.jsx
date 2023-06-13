import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { ImageItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { largeImageURL, webformatURL, tags },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = ({ code, target: { nodeName } }) => {
    if (code === 'Escape' || nodeName === 'DIV') {
      setIsModalOpen(false);
    }
  };

  return (
    <ImageItem>
      <span onClick={openModal}>
        <ImageGalleryItemImage src={`${webformatURL}`} alt={`${tags}`} />
      </span>
      {isModalOpen && (
        <Modal image={largeImageURL} alt={tags} onClose={closeModal} />
      )}
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string,
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
  }),
};
