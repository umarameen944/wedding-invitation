// import React from "react";

// export default function Gallery() {
//   const photos = [
//     "/Gallery1.jpg", "/Gallery2.jpg", "/Gallery6.jpg", "/Gallery4.jpg",
//     "/Gallery5.jpg", 
//      "/Gallery7.jpg", "/Gallery8.jpg", 
//     //  "/Gallery9.jpg",
//     //  "/Gallery7.jpg", "/Gallery8.jpg", "/Gallery9.jpg",

//   ].filter(Boolean);

//   return (
//     <section id="gallery" className="section" aria-label="Gallery">
//       <div className="container">
//         <div className="center">
//           <h3 className="section-title">Gallery</h3>
//           <h2>Our Special Moments</h2>
//           <p className="text-muted">Enjoy our beautiful memories.</p>
//         </div>

//         {/* Simple Auto-Rotating 3D Carousel */}
//         <div className="carousel-container">
//           <div className="carousel-3d">
//             {photos.map((src, index) => (
//               <div
//                 key={index}
//                 className="carousel-item"
//               >
//                 <img
//                   src={src}
//                   alt={`Gallery image ${index + 1}`}
//                   loading="lazy"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useEffect, useRef } from "react";

export default function Gallery() {
  const photos = [
    "/Gallery1.jpg", "/Gallery2.jpg", "/Gallery6.jpg", "/Gallery4.jpg",
    "/Gallery5.jpg", "/Gallery7.jpg", "/Gallery8.jpg", "/Gallery9.jpg",
    "/Gallery10.jpg", "/Gallery11.jpg", "/Gallery12.jpg",
  ].filter(Boolean);

  const carouselRef = useRef(null);

  // Calculate dynamic positions for images
  useEffect(() => {
    if (!carouselRef.current) return;

    const items = carouselRef.current.children;
    const total = items.length;
    
    // Calculate angle between each image
    const angleStep = 360 / total;
    
    // Apply calculated positions to each item
    for (let i = 0; i < total; i++) {
      const angle = angleStep * i;
      const item = items[i];
      
      // Set transform for 3D positioning
      item.style.transform = `rotateY(${angle}deg) translateZ(250px)`;
    }
  }, [photos.length]);

  return (
    <section id="gallery" className="section" aria-label="Gallery">
      <div className="container">
        <div className="center">
          <h3 className="section-title">Gallery</h3>
          <h2>Our Special Moments</h2>
          <p className="text-muted">Enjoy our beautiful memories.</p>
        </div>

        {/* Auto-Rotating 3D Carousel */}
        <div className="carousel-container">
          <div 
            className="carousel-3d" 
            ref={carouselRef}
          >
            {photos.map((src, index) => (
              <div
                key={index}
                className="carousel-item"
              >
                <img
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}