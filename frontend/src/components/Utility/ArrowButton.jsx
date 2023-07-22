export const ArrowButton = ({ imgSrc, imgAlt, slickArrowClass,onClick }) => {
    return (
      <div className="arrow-button-wrapper"  onClick={onClick}>
        <img
          src={imgSrc}
          alt={imgAlt}
          className={slickArrowClass}
          style={{
            width: "50px",
            height: "50px",
          }}
        />
      </div>
    );
  };