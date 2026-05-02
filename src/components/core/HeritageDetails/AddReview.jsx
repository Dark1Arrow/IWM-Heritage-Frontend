import React, { useState } from "react";
import { Star, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../../redux/api/operation/review";

const AddReviewModal = ({ heritageId, onClose }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const starArray = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (rating === 0) return alert("Please select a star rating");
    const formData = {
      ...data,
      rating,
      heritageId,
    };

    const success = await dispatch(createReview(formData, token));
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z- grid place-items-center overflow-auto bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[550px] bg-white rounded-xl shadow-2xl overflow-hidden text-slate-900 border border-slate-200">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-sm">
              {user?.firstName?.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800 leading-none">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">{user?.email}</p>
              <p className="text-[10px] text-indigo-600 font-medium mt-0.5 uppercase tracking-wider">Posting publicly</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">

          {/* Star Rating */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center gap-3">
              {starArray.map((star) => (
                <button
                  key={star}
                  type="button"
                  className="transition-transform hover:scale-110 active:scale-95"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    size={38}
                    fill={(hover || rating) >= star ? "#F59E0B" : "transparent"} // Amber-500
                    className={(hover || rating) >= star ? "text-[#F59E0B]" : "text-slate-300"}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs font-medium text-slate-400">Tap to rate</p>
          </div>

          {/* Text Area */}
          <div className="relative">
            <textarea
              {...register("comment", { required: true })}
              placeholder="Describe your experience at this heritage site..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[160px] text-sm text-slate-800 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400 resize-none shadow-inner"
            />
            {errors.review && (
              <span className="text-red-500 text-[11px] font-medium absolute -bottom-5 left-1">
                Field required
              </span>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end items-center gap-4 pt-4 border-t border-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className={`px-10 py-2.5 text-sm font-bold rounded-lg shadow-md transition-all ${rating > 0
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                }`}
            >
              Post Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;