export default function ImageGalleryItem({ image, onImageClick }) {
  return (
    <li className="gallery-item">
      <img
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onImageClick(image.largeImageURL, image.tags)}
      />
    </li>
  );
}