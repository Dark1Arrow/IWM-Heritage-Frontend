import React, { useEffect } from "react";
import { 
  Star, Heart, ChevronLeft, ChevronRight, Edit3 
} from "lucide-react";

const HeritageDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ratings = [
    { stars: 5, count: 80 },
    { stars: 4, count: 60 },
    { stars: 3, count: 40 },
    { stars: 2, count: 20 },
    { stars: 1, count: 10 },
  ];

  const userReviews = [
    {
      id: 1,
      name: "JL Lovetravel",
      email: "jllovetravel@gmail.com",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      likes: 28,
      time: "6 month ago",
      comment: "The Ganesh Darwaza (the massive wooden gate) is an impressive entrance that immediately transports visitors back to the 18th century. The intricate carvings on the wooden balconies and the stone-work facades are a testament to the Holkar dynasty's craftsmanship."
    },
    {
      id: 2,
      name: "JL Lovetravel",
      email: "jllovetravel@gmail.com",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      likes: 28,
      time: "6 month ago",
      comment: "The Ganesh Darwaza (the massive wooden gate) is an impressive entrance that immediately transports visitors back to the 18th century. The intricate carvings on the wooden balconies and the stone-work facades are a testament to the Holkar dynasty's craftsmanship."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] pb-10 md:pb-20 font-sans overflow-x-hidden">
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <div className="w-full max-w-7xl mx-auto bg-white shadow-sm">
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1600&fit=crop" 
            alt="Rajwada Palace" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 text-white">
            <h1 className="text-3xl md:text-6xl font-extrabold mb-2 tracking-tight">Rajwada Palace</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm md:text-xl font-medium text-gray-200">
              <span>राजवाड़ा महल</span>
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>18th Century</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 2. MAIN CONTENT AREA ==================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-8 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          
          {/* LEFT COLUMN: INFORMATION & REVIEWS */}
          <div className="lg:col-span-2 space-y-12 md:space-y-16">
            
            {/* Introduction Section */}
            <section>
              <h2 className="text-2xl md:text-4xl font-bold text-[#4A2E1B] mb-6 leading-tight">
                Where Indore's royal legacy meets timeless architecture
              </h2>
              <div className="text-gray-700 text-base md:text-lg space-y-6 leading-relaxed">
                <p className="italic border-l-4 border-amber-500 pl-4 bg-amber-50/50 py-3 rounded-r-lg">
                  A magnificent seven-story palace blending Maratha, Mughal, and French architectural styles.
                </p>
                <p>
                  Built in 1747, Rajwada serves as the seat of power for the Holkar rulers. Its unique structure featuring a blend of stone and high-quality teak wood has survived battles and fires through centuries.
                </p>
              </div>
            </section>

            {/* 👇 PICTURE BEFORE TIMELINE 👇 */}
            <div className="w-full max-w-[450px] rounded-xl overflow-hidden shadow-md border-2 border-white mx-auto md:mx-0">
              <img 
                src="https://media.istockphoto.com/id/1215274990/photo/high-wide-angle-view-of-charminar-in-the-night.webp?a=1&b=1&s=612x612&w=0&k=20&c=sQggGGYHLaIX4wlJzKYeLkEZHthBO6vLY-Rwwo75KxA=" 
                alt="Rajwada Preview" 
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Historical Timeline */}
            <section>
              <h3 className="text-xl md:text-2xl font-bold text-[#4A2E1B] border-b-2 border-amber-100 pb-2 mb-6 uppercase tracking-wider">Historical Timeline</h3>
              <div className="space-y-4 text-gray-600 text-sm md:text-base">
                <p><span className="font-bold text-slate-900">1747 —</span> Initial construction under Malhar Rao Holkar.</p>
                <p><span className="font-bold text-slate-900">1818 —</span> Central residence for the Holkar dynasty.</p>
                <p><span className="font-bold text-slate-900">Present —</span> Restored as a heritage and tourist attraction.</p>
              </div>
            </section>

            {/* Architectural Style */}
            <section>
              <h3 className="text-xl md:text-2xl font-bold text-[#4A2E1B] border-b-2 border-amber-100 pb-2 mb-6 uppercase tracking-wider">Architectural Style</h3>
              <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
                <p><span className="font-bold text-slate-900">Maratha Influence:</span> Strong wooden structures and traditional courtyard layout.</p>
                <p><span className="font-bold text-slate-900">Mughal Elements:</span> Arches and symmetrical planning.</p>
                <p><span className="font-bold text-slate-900">French Touch:</span> Decorative balconies and refined facade design.</p>
              </div>
            </section>

            {/* Cultural Significance */}
            <section>
              <h3 className="text-xl md:text-2xl font-bold text-[#4A2E1B] border-b-2 border-amber-100 pb-2 mb-6 uppercase tracking-wider">Cultural Significance</h3>
              <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>Rajwada is more than just a palace—it is a symbol of Indore's identity. It hosts major festivals like Dussehra and Diwali with grand lighting.</p>
                <p className="font-extrabold text-slate-800 tracking-tight">The palace continues to connect modern Indore with its royal past.</p>
              </div>
            </section>

            {/* Picture Slider */}
            <section>
              <div className="relative group">
                <div className="w-full h-[250px] sm:h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                  <img src="https://images.unsplash.com/photo-1775840535417-71811b19db5a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover" alt="Rajwada" />
                </div>
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                  <button className="bg-white/90 p-3 rounded-full shadow-xl text-[#4A2E1B] hover:bg-white"><ChevronLeft size={24}/></button>
                  <button className="bg-white/90 p-3 rounded-full shadow-xl text-[#4A2E1B] hover:bg-white"><ChevronRight size={24}/></button>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section className="pt-10 space-y-12">
              <h3 className="text-2xl md:text-3xl font-bold text-[#4A2E1B]">Visitors Reviews</h3>
              <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="w-full md:w-2/3 space-y-4">
                  {ratings.map((rate) => (
                    <div key={rate.stars} className="flex items-center gap-4">
                      <span className="text-xs font-bold w-4">{rate.stars}</span>
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${rate.count}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full md:w-1/3 text-center md:border-l border-gray-100 flex flex-col items-center">
                  <div className="text-6xl md:text-8xl font-black text-slate-800 tracking-tighter">4.5</div>
                  <div className="flex gap-1 my-3 text-amber-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={22} fill={i < 4 ? "currentColor" : "none"} />)}
                  </div>
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">450 TOTAL REVIEWS</p>
                </div>
              </div>

              {/* Individual Comments */}
              <div className="space-y-8">
                {userReviews.map((review) => (
                  <div key={review.id} className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <img src={review.img} className="w-14 h-14 rounded-full object-cover border-2 border-amber-100 shadow-md" alt="user" />
                        <div><h4 className="font-bold text-slate-900 text-lg">{review.name}</h4><p className="text-xs text-gray-400 font-medium">{review.email}</p></div>
                      </div>
                      <div className="flex flex-col items-center text-gray-300 hover:text-red-500 cursor-pointer transition-all">
                        <Heart size={24} fill="currentColor" className="opacity-10 hover:opacity-100" />
                        <span className="text-[10px] font-bold mt-1">{review.likes}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base italic leading-relaxed">"{review.comment}"</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pb-12">
                <button className="flex items-center gap-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white px-10 py-4 rounded-2xl font-bold shadow-2xl transition-all">
                  <Edit3 size={20} /> Add Review
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: STICKY PLANNER SIDEBAR (SAM SAME AS FIGMA) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-10 space-y-8">
              
              {/* Plan Your Visit Card */}
              <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-[#59251E] text-white px-6 py-4">
                  <h4 className="text-lg font-bold tracking-tight">Plan Your Visit</h4>
                </div>
                
                <div className="p-6 space-y-6 text-[13px]">
                  <div className="space-y-1">
                    <p className="font-bold text-[#59251E]">Opening Hours</p>
                    <p className="text-gray-600 font-medium">Monday - Sunday</p>
                    <p className="text-gray-600 font-medium tracking-tighter">10:00 AM - 6:00 PM</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-bold text-[#59251E]">Entry Fee</p>
                    <div className="flex justify-between text-gray-600 font-medium"><span>Indian</span><span>₹20</span></div>
                    <div className="flex justify-between text-gray-600 font-medium"><span>Foreign</span><span>₹250</span></div>
                    <div className="flex justify-between text-gray-600 font-medium"><span>Children</span><span>Free</span></div>
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold text-[#59251E]">Photography</p>
                    <p className="text-gray-600 font-medium">Allowed (₹50 extra)</p>
                    <p className="text-gray-600 font-medium">No flash inside</p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold text-[#59251E]">Tour Guide</p>
                    <p className="text-gray-600 font-medium">Available in Hindi & English</p>
                    <div className="flex justify-between text-gray-600 font-medium"><span>Duration</span><span>1.5 hours</span></div>
                  </div>

                  <div className="space-y-1 pb-4">
                    <p className="font-bold text-[#59251E]">Location</p>
                    <p className="text-gray-600 font-medium leading-relaxed uppercase text-[11px]">Rajwada, Main Square, Indore, MP 452002</p>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <button className="w-full bg-[#D9A05B] text-white font-bold py-3 text-[11px] uppercase tracking-[0.15em] shadow-sm hover:bg-[#c48d4a]">
                      Share This Place
                    </button>
                    <button className="w-full border border-[#D9A05B] text-[#D9A05B] font-bold py-3 text-[11px] uppercase tracking-[0.15em] hover:bg-amber-50">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Details Card */}
              <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-[#59251E] text-white px-6 py-4">
                  <h4 className="text-lg font-bold tracking-tight">Contact Details</h4>
                </div>
                
                <div className="p-6 space-y-6 text-[13px]">
                  <div className="space-y-1"><p className="font-bold text-[#59251E]">Mobile No.</p><p className="text-gray-600">+91 731 2520261</p></div>
                  <div className="space-y-1"><p className="font-bold text-[#59251E]">Email Address</p><p className="text-gray-600 italic">info@imcheritage.in</p></div>
                  <div className="space-y-1"><p className="font-bold text-[#59251E]">Official Website</p><p className="text-gray-600 underline underline-offset-4">imcheritage.in</p></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeritageDetails;