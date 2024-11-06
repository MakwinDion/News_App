import PropTypes from 'prop-types';
import './Newsstyle.css';

const NewsItem = ({ title, description, src, url }) => {
  // Truncate description after a certain length
  const truncateText = (text, length) => {
    return text?.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className='newsitem'>
      <div className="card" style={{ maxWidth: "345px", margin: "10px" }}>
        <img
          src={src} // Using the already validated `src`
          className="card-img-top"
          alt={title || "News Image"}
          onError={(e) => { e.target.src = "https://via.placeholder.com/345x200?text=No+Image"; }} // Fallback if image fails to load
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{truncateText(description, 100)}</p>
          <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  src: PropTypes.string,
  url: PropTypes.string.isRequired,
};

export default NewsItem;
