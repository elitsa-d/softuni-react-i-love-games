export default function Game({ _id, genre, title, imageUrl }) {
  {
    console.log(1);
  }
  return (
    <div className="game">
      <img src={imageUrl} alt={title} />
      <div className="details-overlay">
        <p className="name">{title}</p>
        <p className="genre">{genre}</p>
        <a href="#" className="details-button">
          Details
        </a>
      </div>
    </div>
  );
}
