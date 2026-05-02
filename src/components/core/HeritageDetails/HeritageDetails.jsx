import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeft, ChevronRight, MapPin, Clock,
  Info, Camera, Languages, Phone, Bookmark, Globe, Mail
} from "lucide-react";
import { getHeritageDetails } from "../../../redux/api/operation/heritageApi"
import ReviewsSection from "./ReviewSection";
import { getSavedHeritage, toggleSaveHeritage } from "../../../redux/api/operation/saved";
import { toast } from "react-toastify";

const HeritageDetails = () => {
  const { heritageId } = useParams();
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const [changes,setChanges] = useState(true)

  const [heritage, setHeritage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDetails = async () => {
      setLoading(true);
      try {
        let savedList = []
        if (token) {
          const savedList = await dispatch(getSavedHeritage(token));
          const details = await dispatch(getHeritageDetails(heritageId, savedList));
          setHeritage(details);
        } else {
          const details = await dispatch(getHeritageDetails(heritageId, []));
          setHeritage(details);
        }
      } catch (err) {
        console.error("Failed to fetch heritage details", err);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [heritageId, dispatch, token,changes]); // Corrected dependency

  const handleToggleSave = async (heritageId) => {
    if (token) {
      await dispatch(toggleSaveHeritage(heritageId, token))
    }else{
      toast.error("First login OR Sign your Account")
    }
    setChanges(!changes)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-700 rounded-full animate-spin"></div>
          <div className="text-xl font-serif text-[#59251E] animate-pulse">Discovering Indore's Heritage...</div>
        </div>
      </div>
    );
  }

  if (!heritage) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-serif">
        Heritage site not found.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FDFCFB] pb-10 md:pb-20 font-sans">

      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[40vh] md:h-[70vh] overflow-hidden">
        <img
          src={heritage?.mainImage}
          alt={heritage?.name}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* --- TOP RIGHT: Saved Button --- */}
        <div className="absolute top-6 right-6 md:top-10 md:right-12 z-10">
          {/* {console.log(heritage)} */}
          <button
            onClick={() => handleToggleSave(heritage?._id)}
            className={`group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 border ${heritage?.isSaved
                ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
          >
            <Bookmark
              size={24}
              fill={heritage?.isSaved ? "currentColor" : "none"}
              className={`transition-transform duration-300 ${heritage?.isSaved ? "scale-110" : "group-hover:scale-110"}`}
            />
          </button>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-8 md:bottom-16 left-6 md:left-12 max-w-4xl text-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-amber-500 text-black text-xs font-bold uppercase tracking-widest rounded">
              {heritage?.heritageType}
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-serif font-bold mb-4 drop-shadow-lg leading-tight">
            {heritage?.name}
          </h1>
          <div className="flex items-center gap-4 text-sm md:text-lg font-medium text-gray-200">
            <span className="flex items-center gap-1"><MapPin size={18} className="text-amber-400" /> Indore, MP</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>{heritage?.era}</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* LEFT COLUMN: STORY & DETAILS */}
          <div className="lg:col-span-2 bg-white p-6 md:p-10 shadow-sm rounded-xl space-y-12">

            {/* About Section */}
            <section>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#4A2E1B] mb-6">
                {heritage?.about?.title || "History & Architecture"}
              </h2>
              <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-6">
                <blockquote className="italic border-l-4 border-amber-500 pl-6 py-2 text-[#59251E] font-medium text-xl">
                  "{heritage?.tagline}"
                </blockquote>
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-amber-700">
                  {heritage?.about?.content}
                </p>
              </div>
            </section>

            {/* In-content image */}
            <div className="rounded-2xl overflow-hidden shadow-sm transition hover:scale-[1.01] duration-500">
              <img
                src={heritage?.archFooterImage || heritage?.mainImage}
                alt="Architecture details"
                className="w-full h-[300px] md:h-[450px] object-cover"
              />
            </div>

            {/* Grid of Info: Timeline, Style, etc. */}
            <div className="grid grid-cols-1 gap-12 pt-4">
              {/* Historical Timeline */}
              <section className="bg-stone-50 p-6 rounded-lg border border-stone-100">
                <h3 className="flex items-center gap-2 text-xl font-bold text-[#4A2E1B] mb-6 uppercase tracking-widest border-b pb-2">
                  <Clock size={20} className="text-amber-600" /> Historical Timeline
                </h3>
                <div className="space-y-6 border-l-2 border-amber-200 ml-3">
                  {heritage?.timeline?.map((item, index) => (
                    <div key={index} className="relative pl-8">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-white"></div>
                      <span className="font-bold text-amber-800 text-lg block">{item.year}</span>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Architectural Style */}
              <section>
                <h3 className="text-xl font-bold text-[#4A2E1B] mb-6 uppercase tracking-widest border-b pb-2">Architectural Style</h3>
                <p className="text-gray-800 font-medium mb-6 text-lg">{heritage?.architecture?.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {heritage?.architecture?.influences?.map((inf, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                      <span className="font-bold text-amber-700 block mb-1">{inf.style}</span>
                      <p className="text-gray-600 text-sm">{inf.details}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Cultural Significance */}
              <section className="bg-amber-50/30 p-6 rounded-lg border border-amber-100">
                <h3 className="text-xl font-bold text-[#4A2E1B] mb-6 uppercase tracking-widest border-b border-amber-200 pb-2">Significance & Legacy</h3>
                <p className="text-gray-700 leading-relaxed mb-6 italic">{heritage?.significance?.description}</p>
                <ul className="grid grid-cols-1 gap-3">
                  {heritage?.significance?.points?.map((point, index) => (
                    <li key={index} className="flex gap-3 text-gray-800 font-medium">
                      <span className="text-amber-600 font-bold">0{index + 1}.</span> {point}
                    </li>
                  ))}
                </ul>
              </section>

              {/* The Story */}
              <section>
                <h3 className="text-xl font-bold text-[#4A2E1B] mb-6 uppercase tracking-widest border-b pb-2">The Hidden Stories</h3>
                <div className="bg-white space-y-6">
                  <p className="text-gray-700 leading-relaxed">{heritage?.story?.description}</p>
                  <div className="space-y-4">
                    {heritage?.story?.points?.map((point, index) => (
                      <div key={index} className="flex gap-4 items-start p-4 bg-stone-50 rounded-xl">
                        <Info className="text-amber-600 shrink-0 mt-1" size={20} />
                        <p className="text-gray-800 font-medium leading-tight">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* RIGHT COLUMN: STICKY SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 space-y-6">

              {/* Plan Visit Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[#59251E] text-white px-6 py-5">
                  <h4 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Clock size={20} /> Visit Information
                  </h4>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-xs uppercase font-bold text-amber-700 tracking-widest mb-1">Timings</p>
                    <p className="text-gray-800 font-bold">{heritage?.visitInfo?.days}</p>
                    <p className="text-gray-600">{heritage?.visitInfo?.openingHours}</p>
                  </div>

                  <div className="py-4 border-y border-stone-100">
                    <p className="text-xs uppercase font-bold text-amber-700 tracking-widest mb-3">Entry Fees</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Indian National</span>
                        <span className="font-bold">₹{heritage?.visitInfo?.entryFees?.indian}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Foreign National</span>
                        <span className="font-bold">₹{heritage?.visitInfo?.entryFees?.foreign}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Children</span>
                        <span className="font-bold text-green-600">{heritage?.visitInfo?.entryFees?.children === 0 ? "Free Entry" : `₹${heritage?.visitInfo?.entryFees?.children}`}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex gap-3 items-start">
                      <Camera size={18} className="text-amber-600 shrink-0" />
                      <div>
                        <p className="font-bold text-sm">Photography</p>
                        <p className="text-xs text-gray-500">{heritage?.visitInfo?.photography?.allowed ? `Allowed (₹${heritage?.visitInfo?.photography?.fee} fee)` : "Prohibited"}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <Languages size={18} className="text-amber-600 shrink-0" />
                      <div>
                        <p className="font-bold text-sm">Guides</p>
                        <p className="text-xs text-gray-500">{heritage?.visitInfo?.guidedTours?.available ? `Available in ${heritage?.visitInfo?.guidedTours?.languages?.join(", ")}` : "Self-guided"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3">
                    <button className="w-full bg-[#59251E] text-white font-bold py-4 rounded-lg shadow-md hover:bg-[#401a15] transition-all uppercase text-xs tracking-widest">
                      Share Discovery
                    </button>
                    <button className="w-full border-2 border-amber-600 text-amber-700 font-bold py-4 rounded-lg hover:bg-amber-50 transition-all uppercase text-xs tracking-widest">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
                <h4 className="text-lg font-bold text-[#59251E] mb-4 border-b pb-2">Contact Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-amber-600" />
                    <span className="text-sm font-medium">{heritage?.contact?.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-amber-600" />
                    <span className="text-sm font-medium text-gray-600 truncate">{heritage?.contact?.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe size={16} className="text-amber-600" />
                    <a href={`https://${heritage?.contact?.website}`} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:underline">{heritage?.contact?.website}</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 3. GALLERY SECTION */}
        <section className="mt-20">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#4A2E1B] mb-8 text-center uppercase tracking-widest">Visual Gallery</h3>
          <div className="relative group max-w-5xl mx-auto">
            <div className="w-full h-[350px] md:h-[650px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src={heritage?.gallery?.[activeImgIndex]}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                alt="Gallery View"
              />
            </div>

            {heritage?.gallery?.length > 1 && (
              <>
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button
                    onClick={() => setActiveImgIndex(prev => (prev === 0 ? heritage.gallery.length - 1 : prev - 1))}
                    className="pointer-events-auto bg-white/30 backdrop-blur-md p-4 rounded-full shadow-xl text-white hover:bg-white hover:text-[#4A2E1B] transition-all"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={() => setActiveImgIndex(prev => (prev === heritage.gallery.length - 1 ? 0 : prev + 1))}
                    className="pointer-events-auto bg-white/30 backdrop-blur-md p-4 rounded-full shadow-xl text-white hover:bg-white hover:text-[#4A2E1B] transition-all"
                  >
                    <ChevronRight size={32} />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="flex justify-center gap-2 mt-6">
                  {heritage.gallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${activeImgIndex === idx ? "bg-amber-600 w-8" : "bg-stone-300"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
        {/* {console.log(heritage._id)} */}
        <ReviewsSection heritageId={heritage._id} />
      </div>
    </div>
  );
};

export default HeritageDetails;
