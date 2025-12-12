import React from "react";
import { FaInstagram } from 'react-icons/fa';

export default function Footer(){
  return (
    <footer className="footer" role="contentinfo">
      <div className="container center">
        {/* Main Title */}
        <div style={{fontWeight:800,fontSize:18}}>
          The Nikah of Ayesha & Sadique
        </div>
        
        {/* Decorative Hearts */}
        <div className="footer-hearts">
          <span>♥</span>
          <span>♥</span>
          <span>♥</span>
        </div>
        
        {/* Main Message */}
        <div className="muted" style={{marginTop:8}}>
          Thank you for your blessings — we can't wait to celebrate with you.
        </div>
        
        {/* Wedding Date */}
        <div className="wedding-date">
          December 26 - 10, 2025
        </div>
        
        {/* Copyright */}
        <div className="footer-copyright">
          Made with love for the special day
        </div>
        <a href="https://www.instagram.com/umar._.ameen?igsh=MWJxd212bjhrY2xpZA%3D%3D&utm_source=qr" target="_blank">
          <span className="footer-copyright" style={{
            backgroundColor:'blue'
          }}>
         @by Umar Ameen <FaInstagram style={{ verticalAlign: 'middle' }} />

        </span>
        </a>
      </div>
    </footer>
  );
}