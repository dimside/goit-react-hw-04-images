import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { ImageItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = ({ code, target: { nodeName } }) => {
    if (code === 'Escape' || nodeName === 'DIV') {
      this.setState({ isModalOpen: false });
    }
  };

  render() {
    const { isModalOpen } = this.state;
    const { largeImageURL, webformatURL, tags } = this.props.image;

    return (
      <ImageItem>
        <span onClick={this.openModal}>
          <ImageGalleryItemImage src={`${webformatURL}`} alt={`${tags}`} />
        </span>
        {isModalOpen && (
          <Modal image={largeImageURL} alt={tags} onClose={this.closeModal} />
        )}
      </ImageItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string,
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
  }),
};
