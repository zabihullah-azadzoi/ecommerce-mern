import { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";

const AverageRating = ({ product }) => {
  const [averageRating, setAverageRating] = useState(0);

  //calculating product's average rating
  useEffect(() => {
    if (product.ratings && product.ratings.length > 0) {
      let allRatingStars = [];
      product.ratings.map((rating) => allRatingStars.push(rating.star));

      const starsTotal =
        allRatingStars.reduce((a, b) => a + b) / allRatingStars.length;
      setAverageRating(starsTotal);
    }
  }, [product]);
  return (
    <div className="mt-2 mb-2">
      {product && product.ratings.length > 0 ? (
        <div>
          <StarRatings
            className="mt-2 mb-5"
            rating={averageRating}
            starDimension="20px"
            starSpacing="5px"
            starRatedColor="red"
            numberOfStars={5}
            name="rating average"
          ></StarRatings>
          <p className="m-0 ms-1 d-inline-block">{`(${product.ratings.length})`}</p>
        </div>
      ) : (
        <p className="mt-2 mb-2 "> No rating yet</p>
      )}
    </div>
  );
};

export default AverageRating;
