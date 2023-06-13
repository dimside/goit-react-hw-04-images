import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalInfo } from './Modal.styled';

const modalRoot = document.querySelector('#modal_root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onClose);
    window.addEventListener('click', this.props.onClose);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onClose);
  }

  render() {
    const { image, alt } = this.props;
    return createPortal(
      <Overlay>
        <ModalInfo>
          <img src={`${image}`} alt={`${alt}`} />
        </ModalInfo>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string,
  alt: PropTypes.string,
};
