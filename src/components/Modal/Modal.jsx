import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalInfo } from './Modal.styled';

const modalRoot = document.querySelector('#modal_root');

export const Modal = ({ image, alt, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onClose);
    window.addEventListener('click', onClose);
    return () => window.removeEventListener('keydown', onClose);
  }, [onClose]);

  return createPortal(
    <Overlay>
      <ModalInfo>
        <img src={`${image}`} alt={`${alt}`} />
      </ModalInfo>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string,
  alt: PropTypes.string,
};
