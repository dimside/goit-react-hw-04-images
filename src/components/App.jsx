import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    status: Status.IDLE,
    isEmpty: false,
    error: false,
    isCollectionEnding: false,
  };

  componentDidUpdate(_, { page: prevPage, query: prevQuery }) {
    const { query, page } = this.state;

    if (query !== prevQuery || page !== prevPage) {
      this.setState({ status: Status.PENDING });
      this.getImages();
    }
  }

  getImages = async () => {
    const { query, page } = this.state;

    try {
      const { data } = await getImages(query, page);

      if (data.hits.length === 0) {
        this.setState({ isEmpty: true, status: Status.IDLE });
        return;
      }

      if (Math.ceil(data.totalHits / 12) === page) {
        this.setState({
          isCollectionEnding: true,
          status: Status.RESOLVED,
          value: '',
        });
      }

      this.setState(({ images: prevImages }) => ({
        images: [...prevImages, ...data.hits],
        status: Status.RESOLVED,
      }));
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message, status: Status.REJECTED });
    }
  };

  handleSearchSubmit = value => {
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
    this.setState({
      images: [],
      query: value,
      isEmpty: false,
      page: 1,
      isCollectionEnding: false,
    });
  };

  handleLoadMore = () => {
    this.setState(({ page: prevPage }) => ({ page: prevPage + 1 }));
  };

  render() {
    const { images, isEmpty, status, error, isCollectionEnding } = this.state;

    return (
      <Container>
        <Searchbar onSearchSubmit={this.handleSearchSubmit} />
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
          <Button onLoadMore={this.handleLoadMore} />
        )}
      </Container>
    );
  }
}
