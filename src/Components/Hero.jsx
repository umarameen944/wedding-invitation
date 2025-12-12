import React, { useEffect } from "react";
import { initHeroAnim } from "../animations/gsapAnimations";
import CountdownTimer from "./CountdownTimer";

export default function Hero() {
  useEffect(() => {
    initHeroAnim();
    
    // Add floating elements
    const floatingElements = ["❖", "✦", "✧", "♥", "♡"];
    const container = document.querySelector('.hero');
    
    floatingElements.forEach((symbol, index) => {
      const element = document.createElement('div');
      element.className = 'floating-element';
      element.textContent = symbol;
      element.style.left = `${Math.random() * 90}%`;
      element.style.top = `${Math.random() * 90}%`;
      element.style.animationDelay = `${index * 2}s`;
      container.appendChild(element);
    });
    
    return () => {
      // Cleanup floating elements
      const elements = document.querySelectorAll('.floating-element');
      elements.forEach(el => el.remove());
    };
  }, []);

  return (
    <section id="home" className="hero" role="region" aria-label="Hero section">
      <div 
        className="hero__bg" 
        style={{backgroundImage:"url('/Hero.jpg')"}} 
        aria-hidden
      ></div>
      <div className="hero__overlay" aria-hidden></div>

      <div className="hero__content container" style={{
        marginTop:'100px'
      }}>
        <div className="kicker">With the blessings of Almighty</div>
        
        {/* Arabic Bismillah */}
        <div 
          className="bismillah"
          style={{
            fontSize: 'clamp(28px, 5vw, 42px)',
            color: 'var(--gold)',
            margin: '20px 0',
            fontFamily: '"Amiri", "Traditional Arabic", "Scheherazade", serif',
            textAlign: 'center',
            direction: 'rtl',
            opacity: 0,
            animation: 'fadeInUp 1s ease 0.4s forwards',
            textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)',
            lineHeight: '1.4'
          }}
          aria-label="Bismillah ir-Rahman ir-Raheem"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
        
        <h1 className="title">
          The Nikah of <span>Ayesha & Sadique</span>
        </h1>
        
        <p className="subtitle">
          We request the honour of your presence — December 26 - 10, 2025
        </p>
        
        <CountdownTimer />
        
        <div 
          className="click-hint"
          onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Click to view details
        </div>

        <div className="hero-buttons">
          <a className="btn btn--ghost" href="#events">
            Event Details
          </a>
          <a className="btn btn--ghost" href="#gallery">
            View Gallery
          </a>
          <a className="btn btn--primary" href="#rsvp" style={{display: 'none'}}>
            RSVP Now
          </a>
        </div>
        
        <div 
          className="scroll-indicator"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll to next section"
        ></div>
      </div>
    </section>
  );
}