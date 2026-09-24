import { useEffect, useState } from 'react';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Button from './components/Button';
import Modal from './components/Modal';

import { fetchImages } from './components/services/pixabay-api';

import './App.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }

    async function getImages() {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchImages(query, page);

        setImages(prevImages =>
          page === 1
            ? data.hits
            : [...prevImages, ...data.hits]
        );

        setTotalHits(data.totalHits);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setTotalHits(0);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = (src, alt) => {
    setModalImage({
      src,
      alt,
    });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const showLoadMore =
    images.length > 0 &&
    images.length < totalHits &&
    !loading;

  return (
    <div className="app">
      <Searchbar onSubmit={handleSearch} />

      {error && (
        <p className="error">
          Something went wrong. Please try again.
        </p>
      )}

      <ImageGallery
        images={images}
        onImageClick={handleImageClick}
      />

      {loading && <Loader />}

      {showLoadMore && (
        <Button onClick={handleLoadMore} />
      )}

      {modalImage && (
        <Modal
          image={modalImage}
          onClose={closeModal}
        />
      )}
    </div>
  );
}