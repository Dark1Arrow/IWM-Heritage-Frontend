import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star, Heart, MessageSquare, Plus, Info, Trash2 } from "lucide-react";
import { getSiteReviews, getReviewStats, toggleLikeReview, deleteReview } from "../../../redux/api/operation/review"; // Adjust path
import toast from "react-hot-toast";
import AddReview from "./AddReview"

const ReviewsSection = ({ heritageId }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth); // Assuming auth state

  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addReview, setAddReview] = useState(false)

  const num = [5, 4, 3, 2, 1]

  const fetchReviewData = async () => {
    setLoading(true);
    const [reviewsRes, statsRes] = await Promise.all([
      dispatch(getSiteReviews(heritageId)),
      dispatch(getReviewStats(heritageId))
    ]);
    console.log("reviews: ", reviewsRes, "statsRes: ", statsRes)
    if (reviewsRes) setReviews(reviewsRes);
    if (statsRes) setStats(statsRes);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviewData();
  }, [heritageId,addReview]);

  const handleLike = async (reviewId) => {
    if (!token) return toast.error("Please login to like reviews");
    const updated = await dispatch(toggleLikeReview(reviewId, token));
    if (updated) {
      // Optimistic UI update or re-fetch
      setReviews(prev => prev.map(r => r._id === reviewId ? { ...r, likes: updated.likes } : r));
    }
     fetchReviewData()
  };

  const handleDelete = async (reviewId) => {
    if (!token) return toast.error("Please login to like reviews");
    const updated = await dispatch(deleteReview(reviewId, token));
    if (updated) {
      // Optimistic UI update or re-fetch
      setReviews(prev => prev.map(r => r._id === reviewId ? { ...r, likes: updated.likes } : r));
    }
    fetchReviewData()
  }

  if (loading) return <div className="py-10 text-center text-gray-500">Loading reviews...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 bg-white">
      {
        reviews.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-12 items-start mb-16">

        {/* LEFT: RATING SUMMARY */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-[#4A2E1B]">Visitors Reviews</h2>
            <Info size={18} className="text-gray-400 cursor-help" />
          </div>

          <div className="space-y-3">
            {/* We add here to create the 5 rows for the rating summary */}
            {num.map((star) => {
              // Now 'star' is the number (5, 4, 3, 2, or 1)
              const count = stats?.distribution?.[star] || 0;
              const percentage = stats?.totalReviews ? (count / stats.totalReviews) * 100 : 0;

              return (
                <div key={star} className="flex items-center gap-4">
                  {/* React is happy now because {star} is a number, not a review object! */}
                  <span className="text-sm font-bold w-4">{star}</span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D9A05B] transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: AVERAGE SCORE */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center border-l border-gray-100">
          <div className="text-center">
            <h3 className="text-8xl font-bold text-gray-800 tracking-tighter">
              {console.log(stats.averageRating)}
              {stats?.averageRating?.toFixed(1) || "0.0"}
            </h3>
            <div className="flex gap-1 justify-center my-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  fill={i < Math.round(stats?.averageRating) ? "#D9A05B" : "transparent"}
                  className={i < Math.round(stats?.averageRating) ? "text-[#D9A05B]" : "text-gray-300"}
                />
              ))}
            </div>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">
              {stats?.totalReviews || 0} Reviews
            </p>
          </div>
        </div>
      </div>
        ):(
          <></>
        )
      }

      <hr className="border-gray-100 mb-12" />

      {/* REVIEW LIST */}
      <div className="space-y-12">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="group pb-12 border-b border-gray-50 last:border-0">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-stone-100 shadow-sm">
                    <img
                      src={review?.user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#4A2E1B] leading-none">{review?.user?.firstName} {review?.user?.lastName}</h4>
                    <p className="text-sm text-[#D9A05B] font-medium mt-1">{review?.user?.email}</p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handleLike(review._id)}
                    className="flex items-center gap-2 group/like"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-400 group-hover/like:bg-red-50 group-hover/like:text-red-500 transition-all">
                      <Heart size={20} fill={review.isLiked ? "#ef4444" : "transparent"} className={review.isLiked ? "text-red-500" : ""} />
                    </div>
                    <span className="text-xs font-bold text-gray-400 group-hover/like:text-red-500">{review?.likes?.length || 0}</span>
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-stone-100 hover:text-red-600 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < review.rating ? "#D9A05B" : "transparent"} className={i < review.rating ? "text-[#D9A05B]" : "text-gray-200"} />
                ))}
                <span className="text-xs text-gray-400 ml-3 font-medium">6 months ago</span>
              </div>

              <p className="text-gray-600 leading-relaxed max-w-4xl">
                {review.comment}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-stone-50 rounded-xl border-2 border-dashed border-stone-200">
            <MessageSquare className="mx-auto text-stone-300 mb-2" size={40} />
            <p className="text-stone-500">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>

      {/* ADD REVIEW BUTTON */}
      <div className="flex justify-center mt-12">
        <button onClick={() => setAddReview(true)} className="flex items-center gap-2 bg-[#6B8CEF] hover:bg-[#5a79d6] text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl active:scale-95">
          <Plus size={20} />
          Add Review
        </button>
      </div>

      {addReview && <AddReview heritageId={heritageId} onClose={() => setAddReview(false)} />}
    </div>
  );
};

export default ReviewsSection;