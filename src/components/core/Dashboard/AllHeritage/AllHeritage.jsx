import React, { useEffect, useState } from "react";
import { HiOutlineLocationMarker, HiOutlineClock } from "react-icons/hi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllHeritage, deleteHeritage } from "../../../../redux/api/operation/heritageApi";
import ConfirmationModal from "../../../common/ConformationModel";
import { Link } from "react-router-dom";

const AllHeritage = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state for better UX
  const [confirmationModel, setConfirmationModal] = useState(null)

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      const result = await dispatch(getAllHeritage(token));
      if (result) {
        setPlaces(result);
      }
      setLoading(false);
    };
    fetchPlaces();
  }, [dispatch]);

  const handleDelete = async (heritageId) => {
    const success = await dispatch(deleteHeritage(heritageId, token));

    if (success) {
      setPlaces((prev) => prev.filter((place) => place._id !== heritageId));
    }
    setConfirmationModal(null);
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] px-6 py-10 md:px-10 ">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
        <h1 className="text-4xl font-bold text-black font-serif">
          Discover All Places
        </h1>
        <button
          onClick={() => navigate("/dashboard/add-heritage")}
          className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962e] text-black font-semibold px-6 py-3 rounded-xl transition-all shadow-sm"
        >
          <AiOutlinePlus size={24} />
          <span className="text-lg">Add New place</span>
        </button>
      </div>

      {/* Conditional Rendering for Empty State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl font-medium text-[#5D4037]">Loading sites...</p>
        </div>
      ) : places.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-80 bg-[#FDF8F1] rounded-3xl border-2 border-dashed border-[#EBD9CE]">
          <p className="text-2xl font-serif text-[#3E2723] mb-4">No Data Found</p>
        </div>
      ) : (
        /* Cards Container */
        <div className="space-y-8">
          {places.map((place) => (
            <div
              key={place._id}
              className="bg-[#FDF8F1] border border-[#E8E8E8] rounded-3xl p-6 flex flex-col md:flex-row gap-8 shadow-sm"
            >
              {/* Image Section */}
              <div className="w-full md:w-1/3">
                <img
                  src={place.mainImage}
                  alt={place.name}
                  className="w-full h-64 object-cover rounded-2xl shadow-md"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-3xl font-bold text-[#3E2723] font-serif">
                    {place.name}
                  </h2>
                  <div className="flex gap-3">
                    <Link to={`/dashboard/edit-heritage/${place._id}`}>
                      <button className="p-2 bg-[#E0E0E0] rounded-lg text-gray-600 hover:bg-gray-300 transition-colors">
                        <FiEdit2 size={20} />
                      </button>
                    </Link>
                    <button onClick={() => (
                      setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "This heritage site will be permanently deleted from our records.",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDelete(place._id), // Pass the specific ID
                        btn2Handler: () => setConfirmationModal(null), // Just close it
                      })
                    )} className="p-2 bg-[#FADBD8] rounded-lg text-[#862127] hover:bg-red-200 transition-colors">
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>

                <p className="text-[#5D4037] text-lg leading-relaxed max-w-2xl border-b border-[#EBD9CE] pb-6">
                  {place.tagline || place.about.content?.substring(0, 120) + "..."}
                </p>

                {/* Icon Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="bg-[#EBD9CE] p-2 rounded-lg text-[#5D2E17]">
                      <HiOutlineLocationMarker size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#3E2723]">Location</h4>
                      <p className="text-sm text-[#5D4037] leading-tight">
                        {place.location.address.street}, {place.city || "Indore"}, <br /> Madhya Pradesh
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
                        {place.visitInfo.days}, {place.visitInfo.openingHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {confirmationModel && <ConfirmationModal modelData={confirmationModel} />}
    </div>
  );
};

export default AllHeritage;