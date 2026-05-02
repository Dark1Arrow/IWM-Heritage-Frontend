import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Map from "../pages/Map.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const [heroImage, setHeroImage] = useState(0)

  const heroSectionImages = ["/Home.jpeg", "/chappan.png", "/annapurna.png", "/annapurna.png", "/annapurna.png", "/annapurna.png"]

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heritagePlaces = [
    { id: 1, name: "LAL BAGH PALACE", image: "https://www.trawell.in/admin/images/upload/183831995Lalbagh.jpg" },
    { id: 2, name: "KRISHNA PURA CHHATRI", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIB_jDfjCqN7S8bohd52MfqV_uBS49Mh-hcg&s" },
    { id: 3, name: "RAJWADA", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVdPUAc4B3bWuceyE9z9RBMgH5YjgrqsGYSw&s" },
  ];

  const categories = ["Historical", "Religions", "Museums", "Natural", "Food", "Markets"];

  const reviews = [
    { name: "JL Lovetravel", img: "https://randomuser.me/api/portraits/women/11.jpg" },
    { name: "JL Lovetravel", img: "https://randomuser.me/api/portraits/men/22.jpg" },
    { name: "JL Lovetravel", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  ];

  return (
    <div className="w-full bg-[#f5e6d3] font-sans overflow-x-hidden">

      {/* 1. TOP BANNER HERO */}
      <section className="relative w-full h-[90vh] sm:h-[600px] overflow-hidden">
        <img
          src={heroSectionImages[heroImage]}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 w-full h-[30%] pt-30 bg-gradient-to-t from-[#000000c0]  to-[#00000000] py-4">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-12">
              {categories.map((cat, index) => (
                <li key={index} className="flex items-center gap-4 sm:gap-8 md:gap-12">
                  <button onClick={() => setHeroImage(index)} className={` ${heroImage === index ? "text-amber-400" : "text-white"} text-xs sm:text-sm font-medium tracking-widest uppercase hover:text-amber-400 transition-colors`}>
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
      <section className="bg-[#fff9f3] py-24 sm:py-32 px-6 relative overflow-hidden flex flex-col items-center justify-center border-b border-stone-200">
        {/* 1. Subtle Texture Overlay - Gives a premium "Museum" feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">

          {/* 2. Modern Heritage Tag */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-8 bg-amber-800/40"></div>
            <p className="font-sans text-[10px] sm:text-xs text-amber-900 uppercase tracking-[0.5em] font-semibold">
              The Living Legacy of Indore
            </p>
            <div className="h-px w-8 bg-amber-800/40"></div>
          </div>

          {/* 3. The Heritage Statement */}
          <div className="max-w-3xl mx-auto mb-20">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-stone-900 font-light leading-[1.1] mb-8">
              Preserving the <span className="italic">Soul</span> <br /> of the City
            </h1>
            <p className="font-sans text-base sm:text-lg text-stone-600 max-w-xl mx-auto leading-relaxed font-light tracking-wide">
              Where architectural brilliance meets cultural identity. Experience the curated heritage of Indore through the ages.
            </p>
          </div>

          {/* 4. Refined Navigation - Clean & Minimal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-stone-200 bg-white shadow-sm overflow-hidden rounded-sm">
            <Link to={"/about"} className="px-12 py-6 flex items-center justify-center gap-4 hover:bg-stone-50 transition-all group border-b sm:border-b-0 sm:border-r border-stone-200">
              <span className="text-xs tracking-[0.2em] font-medium text-stone-800 uppercase">About us</span>
              <span className="text-stone-400 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link to={"/heritage-map"} className="px-12 py-6 flex items-center justify-center gap-4 hover:bg-stone-50 transition-all group">
              <span className="text-xs tracking-[0.2em] font-medium text-stone-800 uppercase">Live Map</span>
              <span className="text-stone-400 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* 5. Minimalist Graphic Element */}
          <div className="mt-20 opacity-20">
            <div className="w-px h-24 bg-gradient-to-b from-amber-800 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 3. UNCOVER INDORE SECTION */}
      <section className="bg-[#FAF8F5] py-20 px-6 md:px-12 lg:px-20">
        {/* 1. SECTION TITLE - serif font for classic feel */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl text-[#3E2A1C] font-normal tracking-wide">
            INDORE HERITAGE TRAIL
          </h2>
          <p className="mt-4 font-sans text-sm text-[#8B7E74] uppercase tracking-widest">
            A Journey through the Holkar Era and Beyond
          </p>
        </div>

        {/* 2. THE GALLERY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {heritagePlaces.map((place) => (
            <div key={place.id} className="bg-white p-4 border border-[#E5DFD5] shadow-sm group cursor-pointer hover:shadow-md transition-shadow">
              {/* 3. IMAGE IN A "FRAME" */}
              <div className="relative overflow-hidden aspect-[4/3] w-full">
                <img src={place.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={place.name} />
                <div className="absolute inset-0 bg-[#3E2A1C]/5 group-hover:bg-[#3E2A1C]/0 transition-colors"></div>
              </div>

              {/* 4. CAPTION - below the image */}
              <div className="mt-5 text-left">
                <h3 className="font-serif text-xl text-[#3E2A1C] tracking-tight">
                  {place.name}
                </h3>
                <p className="mt-1 font-sans text-xs text-[#8B7E74] uppercase tracking-widest">
                  {place.type}
                </p>
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
          <div className="w-full relative h-[350px] sm:h-[500px] rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-[#E5DFD5] ">
            <img src="/map.svg" className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* 5. UPDATED CTA SECTION (Figma Style with Multiple Images) */}
      <section className="relative bg-[#fcfaf8] py-24 overflow-hidden">
        {/* Background Decorative Text */}
        <div className="absolute top-10 left-10 text-[15rem] font-serif opacity-[0.03] select-none pointer-events-none">
          Indore
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Image Composition */}
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform -rotate-2">
              <img
                src="/lalbagh2.png"
                alt="Heritage Interior"
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Floating Review Card - Cleaned up */}
            <div className="absolute -right-4 -bottom-8 z-20 bg-white p-6 shadow-xl rounded-xl max-w-[240px] border border-stone-100 transform rotate-3">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-widest uppercase text-stone-400">Reviews</span>
                <span className="text-red-500 text-lg">♥</span>
              </div>
              <div className="space-y-4">
                {heritagePlaces.map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-stone-200 overflow-hidden">
                      <img src={`/avatar-${i}.jpg`} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex text-[10px] text-amber-500">★★★★☆</div>
                      <p className="text-[10px] font-medium text-stone-600">Heritage Explorer</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Background accent box */}
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-stone-200/50 rounded-2xl -z-10"></div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h3 className="text-amber-800 text-sm font-bold uppercase tracking-[0.3em] mb-4">
                Your Collection
              </h3>
              <h2 className="text-4xl sm:text-5xl font-serif text-stone-900 leading-tight">
                Keep the City’s <br />
                <span className="italic">Stories Alive.</span>
              </h2>
            </div>

            <p className="text-stone-600 text-lg leading-relaxed max-w-md">
              Create your personal archive. Save architectural wonders, track your visits, and leave your mark on Indore's history.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to={"/login"}>
              <button className="bg-stone-900 hover:bg-stone-800 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-stone-200">
                Sign In
              </button>
              </Link>
              <Link to={"/signup"}>
              <button className="border border-stone-300 hover:bg-stone-50 text-stone-800 px-10 py-4 text-xs font-bold uppercase tracking-widest transition-all">
                Create Account
              </button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 6. FOOTER */}

      {/* 6. FOOTER */}
      <footer className="bg-[#1a1a1a] text-[#e5dfd5] pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

            {/* Column 1: Brand/Logo */}
            <div className="md:col-span-1">
              <h2 className="font-serif text-2xl tracking-tighter mb-4">
                INDORE <span className="italic opacity-70">HERITAGE</span>
              </h2>
              <div className="h-px w-12 bg-amber-600/50 mb-6"></div>
              <p className="text-sm text-stone-400 leading-relaxed font-light">
                Documenting the architectural soul of the Holkar dynasty. A digital archive for the modern explorer.
              </p>
            </div>

            {/* Column 2: Navigation - Focused on your current pages */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-500/80 mb-6">Sitemap</h4>
              <ul className="space-y-4 text-sm font-light text-stone-300 uppercase tracking-wider">
                <li className="hover:text-amber-400 transition-colors cursor-pointer">
                  <a href="/">Home</a>
                </li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">
                  <a href="/about">About Archive</a>
                </li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">
                  <a href="/map">Heritage Map</a>
                </li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">
                  <a href="/dashboard">User Dashboard</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Regional Details (Indore Focused) */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-500/80 mb-6">Location</h4>
              <p className="text-sm text-stone-400 font-light leading-relaxed">
                Heart of Malwa,<br />
                Madhya Pradesh, India<br />
                <span className="text-[10px] text-stone-600 mt-2 block italic">22.7196° N, 75.8577° E</span>
              </p>
            </div>

            {/* Column 4: Dashboard Quick Link / Join */}
            <div className="bg-stone-800/20 p-6 border border-stone-800 rounded-sm">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-100 mb-4">Collectors Access</h4>
              <p className="text-xs text-stone-500 mb-6 leading-relaxed">Join our community to save locations to your personal map dashboard.</p>
              <button className="w-full py-3 bg-stone-100 text-stone-950 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500 transition-colors">
                Open Dashboard
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8">
              <div className="p-2 border border-stone-800 rounded-full">
                <Star size={14} className="text-amber-600 fill-amber-600" />
              </div>
              <div className="w-px h-4 bg-stone-800"></div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500">
                © 2024 Indore Heritage Archive. All Rights Reserved.
              </p>
            </div>


          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
