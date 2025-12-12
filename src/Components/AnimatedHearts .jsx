// src/components/AnimatedHearts.jsx
import React, { useEffect } from "react";
import "../styles.css"; 

const AnimatedHearts = ({ density = 12, disableOnMobile = true }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // if (disableOnMobile && window.innerWidth < 768) return;

    const container = document.createElement("div");
    container.className = "hearts-root";
    container.setAttribute("aria-hidden", "true");
    document.body.appendChild(container);

    const hearts = [];
    for (let i = 0; i < density; i++) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("class", "heart-svg");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute(
        "d",
        "M12 21s-7.5-4.6-9-7.5C1.5 9.4 4.2 5 8 5c2 0 3.5 1.2 4 2.1C12.5 6.2 14 5 16 5c3.8 0 6.5 4.4 5 8.5-1.5 2.9-9 7.5-9 7.5z"
      );
      path.setAttribute("fill", "currentColor");
      svg.appendChild(path);

      const left = Math.random() * 100;
      svg.style.left = `${left}%`;
      svg.style.opacity = `${0.75 + Math.random() * 0.25}`;
      svg.style.fontSize = `${14 + Math.random() * 22}px`;
      svg.style.transform = `translateY(${10 + Math.random() * 30}px) rotate(${Math.random() * 60 - 30}deg)`;
      svg.style.animationDelay = `${Math.random() * 6}s`;
      svg.style.setProperty("--hue", `${30 + Math.random() * 20}`); // goldish hue

      container.appendChild(svg);
      hearts.push(svg);
    }

    // cleanup
    return () => {
      hearts.forEach(h => h.remove());
      container.remove();
    };
  }, [density, disableOnMobile]);

  return null;
};

export default AnimatedHearts;
