import React from 'react';
import '../index.css';
import { Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();
  
  const challengeData = [
    { title: "Scattered Information", text: "History and guides are spread across disjointed blogs, official sites, and oral histories, making it complete in one place.", img: "Rectangle 280.png" },
    { title: "Outdated Guides", text: "Many available maps and tourism pamphlets are years out of date, leading explorers to closed locations.", img: "Rectangle 307.png" },
    { title: "Lack of Engagement", text: "Existing historical presentation is often text-heavy and uninspiring, failing to captivate younger generations.", img: "Rectangle 308.png" },
    { title: "Hard-to-Access Stories", text: "The most unique cultural stories are locked away in difficult-to-find archives, creating a high barrier for visitors.", img: "Rectangle 309.png" }
  ];

  const features = [
    { title: "Interactive Map", desc: "View all important places in one map", img: "Rectangle 311.png" },
    { title: "Clickable Pins", desc: "Click on any pin to explore instantly", img: "Rectangle 313.png" },
    { title: "Detailed Information", desc: "Learn history, builder, and timeline", img: "Rectangle 315.png" },
    { title: "Visual Images", desc: "See images for better understanding", img: "Rectangle 317.png" }
  ];

  const audienceData = [
    { title: "Tourists", desc: "Discover popular places quickly without searching across multiple sources.", img: "Rectangle 324.png" },
    { title: "Students", desc: "Learn about history, architecture, and important details in a clear format.", img: "Rectangle 326.png" },
    { title: "Locals", desc: "Explore your own city in a new way and uncover stories you might have missed.", img: "Rectangle 328.png" }
  ];

  return (
    <>
    <div className="about-page-wrapper">

      {/* --- SECTION 1: HERO --- */}
      <section className="hero-section">
        <h1 className="page-title">About Page</h1>
        <div className="hero-container">
          <div className="hero-text">
            <h2 className="main-heading">Discover Indore Through <br /> an Interactive Map</h2>
            <p className="tagline">Unveiling Indore's Soul: Where History Meets Storytelling.</p>
            <button 
              onClick={() => navigate("/heritage-map")}
              className="explore-btn"
            >
              Explore Map
            </button>
            <p className="description">
              Explore famous places, learn their history, and uncover the stories behind every landmark — all in one place.
            </p>
            <div className="info-box">
              <p><strong>Did you know?</strong> Indore's Sarafa and Chappan Dukan are unique street food markets that only come alive after sunset.</p>
            </div>
          </div>

          <div className="image-grid">
            <div className="grid-item item-sarafa"><img src="sarafa.png" alt="" /><div className="label">Sarafa Market</div></div>
            <div className="grid-item item-lalbagh-1"><img src="lalbagh1.png" alt="" /><div className="label">Lalbagh palace</div></div>
            <div className="grid-item item-chappan"><img src="chappan.png" alt="" /><div className="label">Chappan Market</div></div>
            <div className="grid-item item-annapurna"><img src="annapurna.png" alt="" /><div className="label">Annapurna Temple</div></div>
            <div className="grid-item item-lalbagh-2"><img src="lalbagh2.png" alt="" /><div className="label">Lalbagh palace</div></div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: CHALLENGES --- */}
      <section className='bg-[#FFF9F9]'>
        <div className="challenges-section">
        <div className="section-header">
          <h2 className="heading-serif">The Challenge of Exploring <br /> Indore Today</h2>
          <p className="subtitle-right">Finding clear and engaging information about Indore's heritage is harder than it should be.</p>
        </div>
        <div className="challenges-cards-grid">
          {challengeData.map((item, index) => (
            <div className="challenge-info-card" key={index}>
              <div className="card-image-box"><img src={item.img} alt="" /></div>
              <div className="card-text-box">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* --- SECTION 3: KEY FEATURES --- */}
      <section className="features-outer-container">
        <div className="section-header">
          <h2 className="heading-serif">A Simpler Way to Explore <br /> Indore</h2>
          <p className="subtitle-right">All the important places, stories, and details — brought together in one interactive experience.</p>
        </div>

        <div
          className="mandala-bg-box"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.88)), url('mandala.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <h2 className="key-features-title">Key Features</h2>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-img-box"><img src={f.img} alt="" /></div>
                <div className="feature-info">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: WHO THIS IS FOR --- */}
      <section className="audience-section">
        <div className="audience-header">
          <h2 className="audience-main-title">Who This Is For</h2>
          <p className="audience-subtitle">Designed for people who want to explore Indore in a simple and meaningful way.</p>
        </div>

        <div className="audience-grid">
          {audienceData.map((person, i) => (
            <div className="audience-card" key={i}>
              <div className="audience-img-container">
                <img src={person.img} alt={person.title} />
              </div>
              <div className="audience-content">
                <h3>{person.title}</h3>
                <p>{person.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
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

            {/* Column 2: Navigation */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-500/80 mb-6">Sitemap</h4>
              <ul className="space-y-4 text-sm font-light text-stone-300 uppercase tracking-wider">
                <li onClick={() => navigate("/")} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Home
                </li>
                <li onClick={() => navigate("/about")} className="hover:text-amber-400 transition-colors cursor-pointer">
                  About Archive
                </li>
                <li onClick={() => navigate("/heritage-map")} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Heritage Map
                </li>
                <li onClick={() => navigate("/dashboard/my-profile")} className="hover:text-amber-400 transition-colors cursor-pointer">
                  User Dashboard
                </li>
              </ul>
            </div>

            {/* Column 3: Location */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-500/80 mb-6">Location</h4>
              <p className="text-sm text-stone-400 font-light leading-relaxed">
                Heart of Malwa,<br />
                Madhya Pradesh, India<br />
                <span className="text-[10px] text-stone-600 mt-2 block italic">22.7196° N, 75.8577° E</span>
              </p>
            </div>

            {/* Column 4: Dashboard Access */}
            <div className="bg-stone-800/20 p-6 border border-stone-800 rounded-sm">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-100 mb-4">Collectors Access</h4>
              <p className="text-xs text-stone-500 mb-6 leading-relaxed">Join our community to save locations to your personal map dashboard.</p>
              <button 
                onClick={() => navigate("/dashboard/my-profile")}
                className="w-full py-3 bg-stone-100 text-stone-950 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500 transition-colors"
              >
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
    </>
  );
};

export default AboutPage;