import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <ImageGalleryList className="gallery">
      {images.map(image => {
        return <ImageGalleryItem key={image.id} image={image} />;
      })}
    </ImageGalleryList>
  );
};
