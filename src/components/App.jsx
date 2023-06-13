import { useState, useEffect, useMemo } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'service/image-service';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Container, Spinner, InfoMessages } from './App.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [isCollectionEnding, setIsCollectionEnding] = useState(false);

  const memoizedFetchImages = useMemo(() => {
    return async () => {
      try {
        const { data } = await getImages(query, page);

        if (data.hits.length === 0) {
          setIsEmpty(true);
          setStatus(Status.IDLE);
          return;
        }

        if (Math.ceil(data.totalHits / 12) === page) {
          setIsCollectionEnding(true);
          setStatus(Status.RESOLVED);
        }

        setImages(images => [...images, ...data.hits]);
        setStatus(Status.RESOLVED);

      } catch (error) {
        console.log(error);
        setError(error.message);
        setStatus(Status.REJECTED);
      }
    };
  }, [page, query]);

  useEffect(() => {
    if (query !== '') {
      setStatus(Status.PENDING);

      memoizedFetchImages();
    }
  }, [query, memoizedFetchImages]);

  const handleSearchSubmit = value => {
    if (value === '') {
      toast.info('Search field must be filled!', {
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    setImages([]);
    setQuery(value);
    setIsEmpty(false);
    setPage(1);
    setIsCollectionEnding(false);
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <Container>
      <Searchbar onSearchSubmit={handleSearchSubmit} />
      <ToastContainer position="top-right" autoClose={2000} />
      {isEmpty && <InfoMessages>There are on images... </InfoMessages>}
      {status === Status.REJECTED && <InfoMessages>{error}</InfoMessages>}
      {<ImageGallery images={images} />}
      {status === Status.PENDING && (
        <Spinner>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </Spinner>
      )}
      {status === Status.RESOLVED && !isEmpty && !isCollectionEnding && (
        <Button onLoadMore={handleLoadMore} />
      )}
    </Container>
  );
};
