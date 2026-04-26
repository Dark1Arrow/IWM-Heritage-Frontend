import React, { useEffect, useState } from "react";
import { HiOutlineLocationMarker, HiOutlineClock, HiBookmark } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSavedHeritage, toggleSaveHeritage } from "../../../../redux/api/operation/saved";

const SavedHeritage = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [savedPlaces, setSavedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      setLoading(true);
      const result = await dispatch(getSavedHeritage(token));
      if (result) {
        // Filter out any entries where the heritage record was deleted (heritageId is null)
        const validData = result.filter(item => item.heritageId !== null);
        setSavedPlaces(validData);
      }
      setLoading(false);
    };
    fetchSavedPlaces();
  }, [dispatch, token]);

  const handleToggleSave = async (e, savedRecordId) => {
    e.preventDefault();
    e.stopPropagation();

    const previousPlaces = [...savedPlaces];

    // Optimistic UI Update: Assume it's a removal and hide it immediately
    setSavedPlaces((prev) => prev.filter((item) => item._id !== savedRecordId));

    try {
      const response = await dispatch(toggleSaveHeritage(savedRecordId, token));
      console.log(savedRecordId)

      const result = await dispatch(getSavedHeritage(token));
      setSavedPlaces(result);

    } catch (error) {
      console.error("Save Toggle Error:", error);
      // Rollback UI if the network or server fails
    }
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] px-6 py-10 md:px-10">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-black font-serif">
          Your Saved Heritage
        </h1>
        <p className="text-[#5D4037] mt-2 text-lg">
          The landmarks you've bookmarked for later.
        </p>
      </div>

      {/* Conditional Rendering */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl font-medium text-[#5D4037] animate-pulse">Loading your collection...</p>
        </div>
      ) : savedPlaces.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-80 bg-[#FDF8F1] rounded-3xl border-2 border-dashed border-[#EBD9CE] shadow-inner">
          <p className="text-2xl font-serif text-[#3E2723] mb-4">No saved places yet</p>
          <button
            onClick={() => navigate("/heritage-map")}
            className="bg-[#D4AF37] text-black px-6 py-2 rounded-xl font-bold hover:bg-[#b8962e] transition-all shadow-sm"
          >
            Explore Indore's Heritage
          </button>
        </div>
      ) : (
        /* Cards Container */
        <div className="space-y-8">
          {savedPlaces.map((item) => {
            const place = item.heritageId;
            if (!place) return null;

            return (
              <Link key={item._id} to={`/heritage-details/${item.heritageId._id}`}>
                
              <div
                className="group bg-[#FDF8F1] border border-[#E8E8E8] mb-10 rounded-3xl p-6 flex flex-col md:flex-row gap-8 shadow-sm hover:shadow-md transition-all relative"
              >
                {/* Bookmark Button - Floated Right */}
                <button
                  onClick={(e) => handleToggleSave(e, item.heritageId._id)}
                  className="absolute top-6 right-6 z-10 p-3 bg-white rounded-2xl text-[#D4AF37] shadow-sm hover:scale-110 transition-transform border border-[#F5E6D3]"
                  title="Remove from saved"
                  >
                  <HiBookmark size={28} />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-1/3">
                  <img
                    src={place.mainImage}
                    alt={place.name}
                    className="w-full h-64 object-cover rounded-2xl shadow-md group-hover:opacity-95 transition-opacity"
                  />
                </div>

                {/* Content Section */}
                <div className="flex-1 space-y-4 pr-12"> {/* pr-12 to avoid overlap with bookmark */}
                  <h2 className="text-3xl font-bold text-[#3E2723] font-serif">
                    {place.name}
                  </h2>

                  <p className="text-[#5D4037] text-lg leading-relaxed border-b border-[#EBD9CE] pb-6">
                    {place.tagline || (place.about?.content?.substring(0, 150) + "...")}
                  </p>

                  {/* Icon Details - Grid to match Discover Page */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    {/* Location */}
                    <div className="flex items-start gap-4">
                      <div className="bg-[#EBD9CE] p-2 rounded-lg text-[#5D2E17]">
                        <HiOutlineLocationMarker size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#3E2723]">Location</h4>
                        <p className="text-sm text-[#5D4037] leading-tight">
                          {place.location?.address?.street ?? "Street not listed"}, <br />
                          {place.city ?? "Indore"}, MP
                        </p>
                      </div>
                    </div>

                    {/* Visiting Hours */}
                    <div className="flex items-start gap-4">
                      <div className="bg-[#EBD9CE] p-2 rounded-lg text-[#5D2E17]">
                        <HiOutlineClock size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#3E2723]">Visiting Hours</h4>
                        <p className="text-sm text-[#5D4037]">
                          {place.visitInfo?.days ?? "Daily"}, <br />
                          {place.visitInfo?.openingHours ?? "Timing not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedHeritage;