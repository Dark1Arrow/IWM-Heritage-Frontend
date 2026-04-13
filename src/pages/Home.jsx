import React, { useEffect } from "react";
import { Star } from "lucide-react";
import Map from "../pages/Map.jsx";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heritagePlaces = [
    { id: 1, name: "LAL BAGH PALACE", image: "https://images.unsplash.com/photo-1590717208803-b541334c9d96?q=80&w=1600" },
    { id: 2, name: "KRISHNA PURA CHHATRI", image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600" },
    { id: 3, name: "RAJWADA", image: "https://images.unsplash.com/photo-1623940153543-984f181f9643?q=80&w=1600" },
  ];

  const categories = ["Historical", "Religions", "Museums", "Natural", "Food", "Markets"];

  const reviews = [
    { name: "JL Lovetravel", img: "https://randomuser.me/api/portraits/women/11.jpg" },
    { name: "JL Lovetravel", img: "https://randomuser.me/api/portraits/men/22.jpg" },
    { name: "JL Lovetravel", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  ];

  return (
    <div className="w-full bg-[#EAE3DB] font-sans overflow-x-hidden">
      
      {/* 1. TOP BANNER HERO */}
      <section className="relative w-full h-[350px] sm:h-[450px] lg:h-[600px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600" 
          alt="Banner" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-sm py-4">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-12">
              {categories.map((cat, index) => (
                <li key={index} className="flex items-center gap-4 sm:gap-8 md:gap-12">
                  <button className="text-white text-xs sm:text-sm font-medium tracking-widest uppercase hover:text-amber-400 transition-colors">
                    {cat}
                  </button>
                  {index !== categories.length - 1 && (
                    <div className="h-4 w-[1px] bg-amber-500/50 hidden sm:block"></div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2. SECONDARY HERO */}
      <section className="relative w-full min-h-[450px] lg:h-[550px] bg-[#00334E] overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-50">
          <img src="https://images.unsplash.com/photo-1623940153543-984f181f9643?w=1600" className="w-full h-full object-cover" alt="Rajwada bg" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 py-12 flex flex-col justify-center text-white text-center md:text-left">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-none">Heritage</h1>
          <p className="text-base sm:text-lg max-w-xl mb-6 sm:mb-8 leading-relaxed text-gray-200 font-light mx-auto md:mx-0">
            Step into centuries of history. Discover palaces, temples, mosques, and monuments that shaped the city of Indore.
          </p>
          <button className="w-full sm:w-fit bg-[#D4A017] text-black font-bold px-10 py-3 rounded-md shadow-xl hover:bg-amber-500 transition-all uppercase tracking-wider text-sm mx-auto md:mx-0">
            View Map
          </button>
        </div>
      </section>

      {/* 3. UNCOVER INDORE SECTION */}
      <section className="py-12 sm:py-20 px-6 lg:px-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#4A2E1B] text-center mb-10 sm:mb-16 uppercase tracking-[0.2em]">
          UNCOVER INDORE
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {heritagePlaces.map((place) => (
            <div key={place.id} className="relative rounded-[2rem] overflow-hidden h-[350px] sm:h-[450px] shadow-2xl group cursor-pointer">
              <img src={place.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={place.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 sm:bottom-10 w-full text-center">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-widest uppercase">{place.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MAP SECTION */}
      <section className="py-12 sm:py-16 bg-white/30">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#8B3A3A] mb-4">Uncover Indore</h2>
          <p className="text-gray-600 mb-8 sm:mb-10 text-base sm:text-lg">Dive into Indore’s famous food culture with Sarafa Bazaar.</p>
          <div className="w-full h-[350px] sm:h-[500px] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border-4 sm:border-8 border-white shadow-2xl">
            <Map />
          </div>
        </div>
      </section>

      {/* 5. UPDATED CTA SECTION (Figma Style with Multiple Images) */}
      <section className="relative py-24 sm:py-40 flex items-center justify-center overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Main Brown Shape */}
          <div className="w-[90%] md:w-[80%] lg:w-[70%] h-[400px] md:h-[450px] bg-[#3B1F12] rounded-[3rem] absolute z-0 shadow-2xl"></div>
          
          {/* Background Image 1 (Left) */}
          <div className="absolute left-[2%] lg:left-[8%] top-[10%] w-48 h-64 lg:w-64 lg:h-80 rounded-[3rem] overflow-hidden border-8 border-[#EAE3DB] hidden md:block -rotate-6 shadow-xl">
             <img src="https://images.unsplash.com/photo-1590717208803-b541334c9d96?w=400" className="w-full h-full object-cover" alt="deco-1" />
          </div>

          {/* Background Image 2 (Right) */}
          <div className="absolute right-[2%] lg:right-[8%] bottom-[10%] w-48 h-64 lg:w-64 lg:h-80 rounded-[3rem] overflow-hidden border-8 border-[#EAE3DB] hidden md:block rotate-6 shadow-xl">
             <img src="https://images.unsplash.com/photo-1623940153543-984f181f9643?w=400" className="w-full h-full object-cover" alt="deco-2" />
          </div>

          {/* Background Image 3 (Center Top) */}
          <div className="absolute top-0 right-[30%] w-40 h-32 rounded-b-[2rem] overflow-hidden border-x-4 border-b-4 border-[#EAE3DB] hidden xl:block shadow-lg">
             <img src="https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=400" className="w-full h-full object-cover" alt="deco-3" />
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 w-full max-w-6xl px-4">
          {/* Main White Card */}
          <div className="bg-white p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-2xl w-full lg:max-w-2xl text-center lg:text-left transform transition-all hover:scale-[1.01]">
            <p className="text-gray-400 font-semibold mb-2 text-sm md:text-base">Let's Get in Touch.</p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 md:mb-12 leading-tight">
              Experience the World's Wonders.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-10 py-4 bg-[#D4A017] text-white font-bold rounded-2xl shadow-lg hover:bg-[#B8860B] transition-all hover:-translate-y-1">Log in</button>
              <button className="px-10 py-4 bg-[#D4A017] text-white font-bold rounded-2xl shadow-lg hover:bg-[#B8860B] transition-all hover:-translate-y-1">Sign up</button>
            </div>
          </div>

          {/* Overlapping Review Card */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl w-full max-w-[260px] lg:-ml-20 lg:-mt-10 border border-gray-100 relative z-20">
             <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-sm text-gray-800">Reviews</span>
                <span className="text-red-500 animate-pulse">❤️</span>
             </div>
             <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    <img src={r.img} className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-100" alt="user" />
                    <div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, index) => <Star key={index} size={10} fill="currentColor" />)}
                      </div>
                      <p className="text-[10px] font-bold text-gray-600">{r.name}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      
      

    </div>
  );
};

export default Home;