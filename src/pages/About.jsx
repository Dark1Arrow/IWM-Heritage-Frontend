import React from 'react';

const AboutPage = () => {
  const challengeData = [
    { title: "Scattered Information", text: "History and guides are spread across disjointed blogs, official sites, and oral histories, making it impossible to get a complete picture in one place.", img: "Rectangle 280.png" },
    { title: "Outdated Guides", text: "Many available maps and tourism pamphlets are years out of date, leading explorers to closed locations or missing new key sites.", img: "Rectangle 307.png" },
    { title: "Lack of Engagement", text: "Existing historical presentation is often text-heavy and uninspiring, failing to captivate younger generations or modern travelers.", img: "Rectangle 308.png" },
    { title: "Hard-to-Access Stories", text: "The most unique cultural stories are locked away in difficult-to-find archives or require local connections, creating a high barrier for visitors.", img: "Rectangle 309.png" }
  ];

  const features = [
    { title: "Interactive Map", desc: "View all important places in one map", img: "Rectangle 311.png" },
    { title: "Clickable Pins", desc: "Click on any pin to explore instantly", img: "Rectangle 313.png" },
    { title: "Detailed Information", desc: "Learn history, builder, and timeline", img: "Rectangle 315.png" },
    { title: "Visual Images", desc: "See images for better understanding", img: "Rectangle 317.png" }
  ];

  const audienceData = [
    { title: "Tourists", desc: "Discover popular places quickly without searching across multiple sources.", img: "Rectangle 324.png" },
    { title: "Students", desc: "Learn about history, architecture, and important details in a clear and structured format.", img: "Rectangle 326.png" },
    { title: "Locals", desc: "Explore your own city in a new way and uncover stories you might have missed.", img: "Rectangle 328.png" }
  ];

  return (
    <div className="about-page-wrapper">
      
      {/* --- SECTION 1: HERO --- */}
      <section className="hero-section">
        <h1 className="page-title">About Page</h1>
        <div className="hero-container">
          <div className="hero-text">
            <h2 className="main-heading">Discover Indore Through <br /> an Interactive Map</h2>
            <p className="tagline">Unveiling Indore's Soul: Where History Meets Storytelling.</p>
            <button className="explore-btn">Explore Map</button>
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
      <section className="challenges-section">
        <div className="section-header">
          <h2 className="heading-serif">The Challenge of Exploring <br /> Indore Today</h2>
          <p className="subtitle-right">Finding clear and engaging information about Indore's heritage is harder than it should be.</p>
        </div>
        <div className="challenges-cards-grid">
          {challengeData.map((item, index) => (
            <div className="challenge-info-card" key={index}>
              {/* Dynamic image according to your requirement */}
              <div className="card-image-box"><img src={item.img} alt="" /></div>
              <div className="card-text-box">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
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
  );
};

export default AboutPage;