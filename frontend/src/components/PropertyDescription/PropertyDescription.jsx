import './PropertyDescription.css';

const PropertyDescription = ({ text }) => {
  if (!text) return null;

  return (
    <div className="property-description-container">
      {text.split('\n').map((paragraph, index) => (
        paragraph.trim() !== '' && (
          <p key={index} className="description-paragraph">
            {paragraph}
          </p>
        )
      ))}
    </div>
  );
};

export default PropertyDescription;