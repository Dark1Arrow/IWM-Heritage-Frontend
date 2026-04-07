import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createHeritage, updateHeritage, getHeritageDetails } from "../../../../redux/api/operation/heritageApi"
import IconBtn from "../../../common/IconBtn"
import Upload from "./Upload"
import { MdDeleteOutline, MdOutlineAddCircle } from "react-icons/md"
import MultiUpload from "./MultiUpload"
import { useParams } from "react-router-dom"

export default function AddHeritage() {
  const { heritageId: id } = useParams();
  const isEdit = Boolean(id);
  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm()
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  // --- Dynamic Array States ---
  const [timeline, setTimeline] = useState([{ year: "", description: "" }])
  const [significancePoints, setSignificancePoints] = useState([""])
  const [archInfluences, setArchInfluences] = useState([{ style: "", details: "" }])

  // --- Handlers ---
  const addTimeline = () => setTimeline([...timeline, { year: "", description: "" }])
  const removeTimeline = (index) => setTimeline(timeline.filter((_, i) => i !== index))

  const addSignificance = () => setSignificancePoints([...significancePoints, ""])
  const removeSignificance = (index) => setSignificancePoints(significancePoints.filter((_, i) => i !== index))

  const addInfluence = () => setArchInfluences([...archInfluences, { style: "", details: "" }])
  const removeInfluence = (index) => setArchInfluences(archInfluences.filter((_, i) => i !== index))

  console.log(errors)

  useEffect(() => {
    if (isEdit) {
      const fetchHeritageDetails = async () => {
        setLoading(true);
        try {
          // Assume you have a getHeritageById thunk/API call
          const response = await dispatch(getHeritageDetails(id));
          const data = response?.data || response;// Adjust based on your Redux structure
          console.log("hey: ", isEdit, id, response)

          if (data) {
            // 1. Reset standard form fields
            reset({
              name: data.name,
              mainImage: data.mainImage,
              archFooterImage: data.archFooterImage,
              galleryImages: data.gallery,
              tagline: data.tagline,
              era: data.era,
              heritageType: data.heritageType,
              aboutTitle: data.about?.title,
              aboutContent: data.about?.content,
              lng: data.location?.coordinates,
              lat: data.location?.coordinates,
              street: data.location?.address?.street,
              archDesc: data.architecture?.description,
              significanceDesc: data.significance?.description,
              openingHours: data.visitInfo?.openingHours,
              days: data.visitInfo?.days,
              indianFee: data.visitInfo?.entryFees?.indian,
              foreignFee: data.visitInfo?.entryFees?.foreign,
              childFee: data.visitInfo?.entryFees?.children,
              photoAllowed: String(data.visitInfo?.photography?.allowed),
              photoFee: data.visitInfo?.photography?.fee,
              photoNotes: data.visitInfo?.photography?.notes,
              guideAvailable: String(data.visitInfo?.guidedTours?.available),
              guideLangs: data.visitInfo?.guidedTours?.languages?.join(", "),
              duration: data.visitInfo?.guidedTours?.duration,
              phone: data.contact?.phone,
              email: data.contact?.email,
              website: data.contact?.website,
            });

            // 2. Update Dynamic States
            if (data.timeline) setTimeline(data.timeline);
            if (data.significance?.points) setSignificancePoints(data.significance.points);
            if (data.architecture?.influences) setArchInfluences(data.architecture.influences);

            // Inside your onSubmit function:

            // Main Image
            if (data.mainImage && data.mainImage instanceof File) {
              formData.append("mainImage", data.mainImage);
            }
            // If it's a string, we don't append anything; 
            // the backend should know not to overwrite if the field is missing.

            // Architecture Footer Image
            if (data.archFooterImage && data.archFooterImage instanceof File) {
              formData.append("archFooterImage", data.archFooterImage);
            }

            // Gallery Images (Multiple)
            if (data.galleryImages && Array.isArray(data.galleryImages)) {
              data.galleryImages.forEach((image) => {
                if (image instanceof File) {
                  formData.append("gallery", image);
                }
              });
            }

            // 3. Handle Images (usually show a preview URL)
            // You might need to pass the existing URL to your Upload/MultiUpload components
          }
        } catch (error) {
          console.error("Fetch Error:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchHeritageDetails();
    }
  }, [id, isEdit, reset, dispatch]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      // --- 1. Identify Edit Mode ---
      // If you have 'heritageId' (from useParams or passed props), append it
      if (isEdit) {
        // Assuming 'heritageId' is the key your backend expects
        formData.append("heritageId", id);
      }

      // --- 2. Basic Fields ---
      formData.append("name", data.name);
      formData.append("tagline", data.tagline);
      formData.append("era", data.era);
      formData.append("heritageType", data.heritageType);

      // Only append images if a NEW file was selected
      if (data.mainImage instanceof File) {
        formData.append("mainImage", data.mainImage);
      }

      // --- 3. JSON Strings for Objects ---
      formData.append("about", JSON.stringify({
        title: data.aboutTitle,
        content: data.aboutContent
      }));

      formData.append("location", JSON.stringify({
        coordinates: [Number(data.lng), Number(data.lat)],
        address: { street: data.street, city: "Indore", state: "Madhya Pradesh" }
      }));

      formData.append("architecture", JSON.stringify({
        description: data.archDesc,
        influences: archInfluences, // This uses your dynamic state
      }));

      if (data.archFooterImage instanceof File) {
        formData.append("archFooterImage", data.archFooterImage);
      }

      formData.append("significance", JSON.stringify({
        description: data.significanceDesc,
        points: significancePoints.filter(p => p.trim() !== "")
      }));

      formData.append("visitInfo", JSON.stringify({
        openingHours: data.openingHours,
        days: data.days,
        entryFees: { indian: data.indianFee, foreign: data.foreignFee, children: data.childFee },
        photography: {
          allowed: data.photoAllowed === "true",
          fee: data.photoFee,
          notes: data.photoNotes
        },
        guidedTours: {
          available: data.guideAvailable === "true",
          languages: typeof data.guideLangs === 'string' ? data.guideLangs.split(",").map(l => l.trim()) : data.guideLangs,
          duration: data.duration
        }
      }));

      formData.append("contact", JSON.stringify({
        phone: data.phone, email: data.email, website: data.website
      }));

      formData.append("timeline", JSON.stringify(timeline));

      // --- 4. Handle Gallery Images ---
      if (data.galleryImages) {
        for (let i = 0; i < data.galleryImages.length; i++) {
          // Only append if it's a new File, ignore existing URLs
          if (data.galleryImages[i] instanceof File) {
            formData.append("gallery", data.galleryImages[i]);
          }
        }
      }

      // --- 5. Dispatch Action based on Mode ---
      let result;
      if (isEdit) {
        result = await dispatch(updateHeritage(formData, token, navigate));
      } else {
        result = await dispatch(createHeritage(formData, token, navigate));
      }

      console.log("Submit Result:", result);

    } catch (error) {
      console.error("Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const galleryImages = watch("galleryImages");

  useEffect(() => {
    if (galleryImages) {
      console.log("Success! gallery is now:", galleryImages);
    } else {
      console.log("garllery is still undefined... waiting for API");
    }
  }, [galleryImages]);

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10 text-white">
      <h1 className="mb-10 text-4xl font-bold text-black font-serif text-center sm:text-left">
        Add Heritage
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="border border-[#E8E8E8] bg-[#FDF8F1] space-y-6 px-10 p-10">

        {/* SECTION 1: BASIC DETAILS */}
        <div className="rounded-md border border-[#f5e6d3] p-6 space-y-4">
          <p className="text-xl font-semibold text-black">1. Basic Details</p>
          <Upload name="mainImage" label="Hero Image (Main)" register={register} setValue={setValue} errors={errors} viewData={isEdit ? watch("mainImage") : null} editData={isEdit} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-black">Site Name <sup className="text-[#862127]">*</sup></label>
              <input className="form-style" {...register("name", { required: true })} placeholder="Rajwada Palace" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-black">Era <sup className="text-[#862127]">*</sup></label>
              <input className="form-style" {...register("era", { required: true })} placeholder="e.g. 18th Century" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-black">Type <sup className="text-[#862127]">*</sup></label>
              <select className="form-style" {...register("heritageType", { required: true })}>
                {['Architectural', 'Religious', 'Commercial', 'Natural', 'Memorial', 'Museums', 'Food', 'Markets'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: CONTENT & ABOUT */}
        <div className="rounded-md border border-[#f5e6d3] p-6 space-y-4">
          <p className="text-xl font-semibold text-black">2. Description & Branding</p>
          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-black">Short Tagline</label>
            <input className="form-style" {...register("tagline")} placeholder="e.g. Heart of the Holkar Dynasty" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-black">Section Headline</label>
            <input className="form-style" {...register("aboutTitle")} placeholder="e.g. A Royal Residence" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-black">Detailed Content <sup className="text-[#862127]">*</sup></label>
            <textarea className="form-style min-h-[120px]" {...register("aboutContent", { required: true })} placeholder="Describe the history..." />
          </div>
        </div>

        {/* SECTION 3: LOCATION */}
        <div className="rounded-md border border-[#f5e6d3] p-6 space-y-4">
          <p className="text-xl font-semibold text-black">3. Location (Coordinates)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="form-style" {...register("lng", { required: true })} placeholder="Longitude (e.g. 75.85)" />
            <input className="form-style" {...register("lat", { required: true })} placeholder="Latitude (e.g. 22.71)" />
          </div>
          <input className="form-style w-full" {...register("street")} placeholder="Street Address / Area" />
        </div>

        {/* SECTION 4: TIMELINE */}
        <div className="rounded-md border border-[#f5e6d3] p-6 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold text-black">4. Historical Timeline</p>
            <button type="button" onClick={addTimeline} className="flex items-center gap-1 text-black underline text-sm"><MdOutlineAddCircle /> Add Event</button>
          </div>
          {timeline.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input className="form-style w-[120px]" placeholder="Year" onChange={(e) => {
                const n = [...timeline]; n[index].year = e.target.value; setTimeline(n);
              }} />
              <input className="form-style flex-1" placeholder="Event Description" onChange={(e) => {
                const n = [...timeline]; n[index].description = e.target.value; setTimeline(n);
              }} />
              <button type="button" onClick={() => removeTimeline(index)} className="text-[#862127] hover:text-pink-50 transition-all"><MdDeleteOutline size={24} /></button>
            </div>
          ))}
        </div>

        {/* SECTION 5: ARCHITECTURE */}
        <div className="rounded-md border border-[#f5e6d3] p-6 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold text-black">5. Architecture & Styles</p>
            <button type="button" onClick={addInfluence} className="flex items-center gap-1 text-black underline text-sm"><MdOutlineAddCircle /> Add Style</button>
          </div>
          <textarea className="form-style min-h-[100px]" {...register("archDesc")} placeholder="Overall Architectural description..." />
          {archInfluences.map((inf, index) => (
            <div key={index} className="flex gap-4 items-center bg-richblack-700 p-3 rounded-md">
              <input className="form-style w-[30%]" placeholder="Style (e.g. Maratha)" onChange={(e) => { const n = [...archInfluences]; n[index].style = e.target.value; setArchInfluences(n); }} />
              <input className="form-style flex-1" placeholder="Specific Details" onChange={(e) => { const n = [...archInfluences]; n[index].details = e.target.value; setArchInfluences(n); }} />
              <button type="button" onClick={() => removeInfluence(index)} className="text-[#862127]"><MdDeleteOutline size={24} /></button>
            </div>
          ))}
          <Upload name="archFooterImage" label="Architecture Footer Image" register={register} setValue={setValue} viewData={isEdit ? watch("archFooterImage") : null} editData={isEdit} />
        </div>

        {/* SECTION 6: SIGNIFICANCE */}
        <div className="rounded-md border border-[#f5e6d3] p-6 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold text-black">6. Cultural Significance</p>
            <button type="button" onClick={addSignificance} className="flex items-center gap-1 text-black underline text-sm"><MdOutlineAddCircle /> Add Point</button>
          </div>
          <textarea className="form-style" {...register("significanceDesc")} placeholder="Broad significance description..." />
          <div className="grid grid-cols-1 gap-2">
            {significancePoints.map((point, index) => (
              <div key={index} className="flex gap-2">
                <input className="form-style flex-1" placeholder="Key Point" value={point} onChange={(e) => { const n = [...significancePoints]; n[index] = e.target.value; setSignificancePoints(n); }} />
                <button type="button" onClick={() => removeSignificance(index)} className="text-[#862127]"><MdDeleteOutline size={24} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 7: VISITOR INFO */}
        <div className="rounded-md border border-[#f5e6d3] p-6 space-y-4">
          <p className="text-xl font-semibold text-black">7. Visitor & Facility Details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="form-style" {...register("openingHours")} placeholder="Opening Hours (e.g. 10 AM - 6 PM)" />
            <input className="form-style" {...register("days")} placeholder="Open Days (e.g. Tue - Sun)" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-[#ebd9ce] pb-4">
            <input className="form-style" {...register("indianFee")} placeholder="Indian Fee (₹)" type="number" />
            <input className="form-style" {...register("foreignFee")} placeholder="Foreign Fee (₹)" type="number" />
            <input className="form-style" {...register("childFee")} placeholder="Children Fee (e.g. Free)" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div className="space-y-3">
              <label className="text-black font-medium">Photography</label>
              <select className="form-style" {...register("photoAllowed")}>
                <option value="true">Allowed</option>
                <option value="false">Prohibited</option>
              </select>
              <input className="form-style" {...register("photoFee")} placeholder="Fee (₹)" type="number" />
              <input className="form-style" {...register("photoNotes")} placeholder="Photography Notes" />
            </div>
            <div className="space-y-3">
              <label className="text-black font-medium">Guided Tours</label>
              <select className="form-style" {...register("guideAvailable")}>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
              <input className="form-style" {...register("guideLangs")} placeholder="Langs (e.g. Hindi, English)" />
              <input className="form-style" {...register("duration")} placeholder="Avg. Duration" />
            </div>
          </div>
        </div>

        {/* SECTION 8: GALLERY & CONTACT */}
        <div className="rounded-md border border-[#f5e6d3] p-6 space-y-4">
          <p className="text-xl font-semibold text-black">8. Gallery & Final Details</p>
          <MultiUpload name="galleryImages" // Must match the key in your reset() object exactly
            label="Upload Multiple Images"
            register={register}
            setValue={setValue}
            viewData={watch("galleryImages")}
            errors={errors} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-richblack-600">
            <input className="form-style" {...register("phone")} placeholder="Phone Number" />
            <input className="form-style" {...register("email")} placeholder="Official Email" />
            <input className="form-style" {...register("website")} placeholder="Website URL" />
          </div>
        </div>

        <div className="flex justify-end gap-x-4 pt-4">
          <button type="button" onClick={() => navigate(-1)} className="rounded-md bg-[#5D2E17] px-8 py-2 font-semibold text-richblack-5">Cancel</button>
          <IconBtn type="submit" disabled={loading} text={loading ? "Processing..." : "Publish Heritage"} />
        </div>

      </form>
    </div>
  )
}