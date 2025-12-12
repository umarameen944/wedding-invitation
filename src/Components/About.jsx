import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="section about" aria-label="About section">
      <div className="container">
        <div className="about__wrapper">
          {/* Text Content */}
          <div className="about__text">
            <h3 className="section-title">Our Story</h3>
            <h2>How we met & our journey</h2>
            <p className="text-muted">
              Two hearts met through an arranged match, gently guided by
              destiny. With Allah’s blessings, our bond grew into comfort and
              love. We exchanged rings on 14th September 2025, sealing a promise
              of forever. Now we step into our new chapter, hand in hand, with
              faith leading our way.
            </p>
          </div>

          {/* Image Grid */}
          <div className="about__media">
            <div className="card card-1">
              <img
                src="/About1.jpg"
                alt="Ayesha and Sadique smiling together"
                loading="lazy"
              />
            </div>
            <div className="card card-2">
              <img
                src="/About2.jpg"
                alt="Ayesha and Sadique on their journey"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
