import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Events from "./Components/Events";
import Gallery from "./Components/Gallery";
import Footer from "./Components/Footer";
import Preloader from "./Components/Preloader";
import AnimatedHearts from "./Components/AnimatedHearts ";  
import SuperParticles from "./Components/SuperParticles";
import AudioPlayer from "./Components/AudioPlayer"; 
import UmarAmeenCredit from "./Components/UmarAmeenCredit";



export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [enableFancyEffects, setEnableFancyEffects] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoaded(true);
      // Show audio player after a short delay to ensure page is loaded
      setTimeout(() => setShowAudioPlayer(true), 500);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      // ENABLE animations everywhere unless user disables motion
      setEnableFancyEffects(!reduce.matches);
    };

    update();

    reduce.addEventListener?.("change", update);

    return () => {
      reduce.removeEventListener?.("change", update);
    };
  }, []);

  return (
    <>
      {!loaded && <Preloader />}

      <div className={`app-root ${loaded ? "ready" : ""}`} style={{
        width: "100%",
      }}>
        <Navbar />

        {/* Umar Ameen Credit Chip - Simple & Elegant */}
        <UmarAmeenCredit />

        {/* ALWAYS visible on all device sizes */}
        {enableFancyEffects && <SuperParticles />}
        {enableFancyEffects && <AnimatedHearts density={14} />}

        <main>
          <Hero />
          <About />
          <Events />
          <Gallery />
        </main>
        <Footer />

        {/* Audio Player - Fixed at bottom right */}
        {showAudioPlayer && <AudioPlayer />}
      </div>
    </>
  );
}