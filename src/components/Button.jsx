export default function Button({ onClick }) {
  return (
    <button
      className="load-more"
      type="button"
      onClick={onClick}
    >
      Load more
    </button>
  );
}