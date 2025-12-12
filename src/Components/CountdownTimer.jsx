import React, { useEffect, useState } from "react";

export default function CountdownTimer() {
  const weddingDate = new Date("2025-12-26T00:00:00");

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: d.toString().padStart(2, "0"),
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0"),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-container">
      {/* LINE 1 – DAYS */}
      <div className="days-line">
        <span className="days-number">{timeLeft.days}</span>
        <span className="days-label">Days</span>
      </div>

      <div className="time-line">
        <span>{timeLeft.hours} Hr</span>
        <span className="separator">:</span>
        <span>{timeLeft.minutes} Min</span>
        <span className="separator">:</span>
        <span>{timeLeft.seconds} Sec</span>
      </div>
    </div>
  );
}
