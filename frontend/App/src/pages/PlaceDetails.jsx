
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./PlaceDetails.css";

const API_URL = import.meta.env.VITE_API_URL;

const PlaceDetails = () => {
  const { id } = useParams();
  const { user, token } = useAuth();

  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [myReview, setMyReview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/api/places/${id}`
        );

        setPlace(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load place"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);

      const response = await axios.get(
        `${API_URL}/api/reviews/place/${id}`
      );

      const fetchedReviews = response.data.reviews || [];

      setReviews(fetchedReviews);

      if (user && token) {
        const ownReview = fetchedReviews.find(
          (review) => review.user?._id === user._id
        );

        if (ownReview) {
          setMyReview(ownReview);
          setRating(ownReview.rating);
          setComment(ownReview.comment);
        } else {
          setMyReview(null);
          setRating(5);
          setComment("");
        }
      }
    } catch (error) {
      setReviewError(
        error.response?.data?.message ||
          "Failed to load reviews"
      );
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id, user, token]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    setReviewError("");
    setSuccess("");

    if (!token) {
      setReviewError("Please login to add a review");
      return;
    }

    if (!comment.trim()) {
      setReviewError("Please write a comment");
      return;
    }

    try {
      setSubmitting(true);

      if (editing && myReview) {
        await axios.put(
          `${API_URL}/api/reviews/${myReview._id}`,
          { rating, comment },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setSuccess("Your review has been updated successfully");
      } else {
        await axios.post(
          `${API_URL}/api/reviews/place/${id}`,
          { rating, comment },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setSuccess("Your review has been added successfully");
      }

      setEditing(false);
      await fetchReviews();
    } catch (error) {
      setReviewError(
        error.response?.data?.message ||
          "Failed to save your review"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your review?"
    );

    if (!confirmed) return;

    try {
      setReviewError("");
      setSuccess("");

      await axios.delete(
        `${API_URL}/api/reviews/${myReview._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMyReview(null);
      setRating(5);
      setComment("");
      setEditing(false);
      setSuccess("Your review has been deleted successfully");

      await fetchReviews();
    } catch (error) {
      setReviewError(
        error.response?.data?.message ||
          "Failed to delete your review"
      );
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) => total + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  if (loading) {
    return <p className="text-center">Loading place...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  if (!place) {
    return <h2 className="text-center">Place not found</h2>;
  }

  return (
    <section className="place-details-section">
      <Link
        to={
          place.destination?._id
            ? `/destinations/${place.destination._id}`
            : "/"
        }
        className="back-home"
      >
        ←
      </Link>

      <div className="container">
        <div className="place-details-heading">
          <h1>{place.name}</h1>

          {place.destination && (
            <p>
              {place.destination.name}
            </p>
          )}
        </div>

        <img
          src={place.image}
          alt={place.name}
          className="destination-image"
        />

        <div className="place-about">
          <h2>About this place</h2>
          <p>{place.description}</p>
        </div>

        <div className="place-reviews-section">
          <h2>Reviews & Ratings</h2>

          <div className="reviews-summary">
            <h3>{averageRating} / 5</h3>
            <p>
              {reviews.length}{" "}
              {reviews.length === 1 ? "Review" : "Reviews"}
            </p>
          </div>

          {reviewsLoading ? (
            <p>Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review this place!</p>
          ) : (
            <div className="place-reviews-list">
              {reviews.map((review) => (
                <div
                  className="place-review-card"
                  key={review._id}
                >
                  <div className="review-user">
                    {review.user?.profileImage && (
                      <img
                        src={review.user.profileImage}
                        alt={review.user.name}
                      />
                    )}

                    <h4>
                      {review.user?.name || "User"}
                    </h4>
                  </div>

                  <div className="review-rating">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>

                  <p>{review.comment}</p>

                  <small>
                    {new Date(
                      review.createdAt
                    ).toLocaleDateString()}
                  </small>
                </div>
              ))}
            </div>
          )}

          <div className="add-review-section">
            <h3>
              {myReview && !editing
                ? "Your Review"
                : editing
                ? "Edit Your Review"
                : "Write a Review"}
            </h3>

            {!user || !token ? (
              <p>
                Please <Link to="/login">login</Link> to write a review.
              </p>
            ) : myReview && !editing ? (
              <div>
                <p>You have already reviewed this place.</p>

                <button
                  type="button"
                  onClick={() => setEditing(true)}
                >
                  Edit Review
                </button>

                <button
                  type="button"
                  onClick={handleDeleteReview}
                >
                  Delete Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview}>
                <label>Rating</label>

                <div className="review-rating-input">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setRating(value)}
                      className={
                        value <= rating ? "selected" : ""
                      }
                    >
                      ★
                    </button>
                  ))}
                </div>

                <label htmlFor="review-comment">
                  Your Comment
                </label>

                <textarea
                  id="review-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..."
                  rows="4"
                  maxLength="1000"
                  required
                />

                {reviewError && (
                  <p className="text-danger">{reviewError}</p>
                )}

                {success && (
                  <p className="text-success">{success}</p>
                )}

                <button type="submit" disabled={submitting}>
                  {submitting
                    ? "Saving..."
                    : editing
                    ? "Update Review"
                    : "Submit Review"}
                </button>

                {editing && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setRating(myReview.rating);
                      setComment(myReview.comment);
                      setReviewError("");
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            )}

            {reviewError && myReview && !editing && (
              <p className="text-danger">{reviewError}</p>
            )}

            {success && myReview && !editing && (
              <p className="text-success">{success}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceDetails;
