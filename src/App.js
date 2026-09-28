import { Component } from 'react';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Button from './components/Button';
import Modal from './components/Modal';

import { fetchImages } from './components/services/pixabay-api';

import './App.css';

export default class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    error: false,
    modalImage: null,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getImages();
    }
  }

  async getImages() {
    const { query, page } = this.state;

    if (!query) {
      return;
    }

    try {
      this.setState({
        loading: true,
        error: false,
      });

      const data = await fetchImages(query, page);

      this.setState(prevState => ({
        images:
          page === 1
            ? data.hits
            : [...prevState.images, ...data.hits],
        totalHits: data.totalHits,
      }));
    } catch (error) {
      this.setState({
        error: true,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  handleSearch = newQuery => {
    this.setState({
      query: newQuery,
      page: 1,
      images: [],
      totalHits: 0,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageClick = (src, alt) => {
    this.setState({
      modalImage: {
        src,
        alt,
      },
    });
  };

  closeModal = () => {
    this.setState({
      modalImage: null,
    });
  };

  render() {
    const {
      images,
      loading,
      error,
      modalImage,
      totalHits,
    } = this.state;

    const showLoadMore =
      images.length > 0 &&
      images.length < totalHits &&
      !loading;

    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSearch} />

        {error && (
          <p className="error">
            Something went wrong. Please try again.
          </p>
        )}

        <ImageGallery
          images={images}
          onImageClick={this.handleImageClick}
        />

        {loading && <Loader />}

        {showLoadMore && (
          <Button onClick={this.handleLoadMore} />
        )}

        {modalImage && (
          <Modal
            image={modalImage}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}