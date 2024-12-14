import React from 'react';
import '../styles/AboutUs.css'; // Đảm bảo bạn đã tạo file CSS trong styles

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Header Section */}
      <div className="about-us-header">
        <h1>About Us</h1>
        <p>Discover our story, our values, and our amazing team!</p>
      </div>

      {/* Content Section */}
      <div className="about-us-content">
        {/* Mission Section */}
        <section className="about-us-mission">
          <h2>Our Mission</h2>
          <p>
            We are dedicated to delivering the best rainwear solutions that combine durability, comfort, and style. 
            Whether you're exploring the outdoors or commuting in the rain, we've got you covered.
          </p>
        </section>

        {/* Values Section */}
        <section className="about-us-values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h4>Customer First</h4>
              <p>We prioritize your needs and satisfaction in everything we do.</p>
            </div>
            <div className="value-card">
              <h4>Quality Assurance</h4>
              <p>Every product is made with care and precision to ensure long-lasting performance.</p>
            </div>
            <div className="value-card">
              <h4>Innovation</h4>
              <p>We constantly innovate to bring you the latest and best in rainwear technology.</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="about-us-team">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="/assets/images/OIP.jpg" alt="Team Member 1" />
              <h4>John Doe</h4>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <img src="/assets/images/meo-gg.jpg" alt="Team Member 2" />
              <h4>Jane Smith</h4>
              <p>Product Manager</p>
            </div>
            <div className="team-member">
              <img src="/assets/images/hj.jpg" alt="Team Member 3" />
              <h4>David Lee</h4>
              <p>Lead Designer</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
