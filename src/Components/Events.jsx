import { color } from "framer-motion";
import { text } from "framer-motion/client";
import React, { useEffect, useRef, useState } from "react";
import {
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMosque,
  FaDownload,
  FaMapMarkedAlt  
} from "react-icons/fa";

const events = [
  {
    title: "Nikah",
    date: "Dec 26, 2025",
    time: "5:00 PM",
    venue: "Shiva Convention Hall",
    mapsQuery: "shiva convention hall maddur 571428 ",
    downloadCard: "/Card1.jpg",
  },
  {
    title: "Valima",
    date: "Dec 28, 2025",
    time: "2:00 PM",
    venue: "Grand MG Mahal",
    mapsQuery: "grand mg mahal denkanikottai, krishnagiri 635107",
    downloadCard: "/Card2.jpg",
  },
];

export default function Events() {
  const [visibleCards, setVisibleCards] = useState([]);
  const eventRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards((prev) => [...prev, index]);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    eventRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleDownloadCard = (cardUrl, title) => {
    const link = document.createElement("a");
    link.href = cardUrl;
    link.download = `${title}-invitation.jpg`;
    link.click();
  };

  return (
    <section id="events" className="section">
      <div className="container">
        <div className="center">
          <h3 className="section-title">Celebrations</h3>
          <h2>Our Wedding Events</h2>
          <p className="text-muted">
            Join us for these special moments as we celebrate our union.
          </p>
        </div>

        <div className="events-grid">
          {events.map((ev, i) => (
            <article
              key={i}
              ref={(el) => (eventRefs.current[i] = el)}
              className={`event ${visibleCards.includes(i) ? "visible" : ""}`}
            >
              <div className="event-decor event-decor-1"></div>
              <div className="event-decor event-decor-2"></div>

              <div className="event-header">
                <div className="event-main-icon">
                  <FaMosque />
                </div>
                <h4 style={{
                  color:'white'
                }}>{ev.title}</h4>
              </div>

              <div className="event-row">
                <div className="ev-icon">
                  <FaCalendarAlt />
                </div>
                <span>{ev.date}</span>
              </div>

              <div className="event-row">
                <div className="ev-icon">
                  <FaClock />
                </div>
                <span>{ev.time}</span>
              </div>

              <div
                className="event-row"
              >
                <div className="ev-icon">
                  <FaMapMarkerAlt />
                </div>
                <span>{ev.venue}</span>
              </div>
               <div
                className="event-row"
              >
               <div className="ev-icon">
                  <FaMapMarkedAlt />
                </div>
              <span
              style={{
                outline:'none',
                color:'#a0afdaff',
                 textDecoration:'UNDERLINE',
                cursor:'pointer'
              }}
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${encodeURIComponent(
                      ev.mapsQuery
                    )}`,
                    "_blank"
                  )
                }>Click to view on map
                </span>
                </div>
              <p className="event-note">
                Kindly arrive on time.
              </p>

              <button
                className="download-btn"
                onClick={() => handleDownloadCard(ev.downloadCard, ev.title)}
              >
                <FaDownload className="download-icon" />
                Download Invitation Card
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}