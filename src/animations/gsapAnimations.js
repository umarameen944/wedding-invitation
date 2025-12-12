import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initHeroAnim() {
  gsap.from(".title", {
    opacity: 0,
    y: 40,
    duration: 1.1,
    ease: "power3.out",
  });
  gsap.from(".subtitle", { opacity: 0, y: 20, duration: 0.9, delay: 0.18 });

  // slow background kenburns effect
  gsap.to(".hero__bg", { scale: 1.08, duration: 14, ease: "none", repeat: -1, yoyo: true });
}

export function initAboutAnim() {
  gsap.from(".about__text", {
    scrollTrigger: { trigger: ".about", start: "top 80%" },
    x: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
  gsap.from(".about__media .card", {
    scrollTrigger: { trigger: ".about", start: "top 80%" },
    stagger: 0.12,
    y: 40,
    opacity: 0,
    duration: 0.9,
  });
}

export function initGalleryAnim() {
  gsap.from(".gallery-masonry img", {
    scrollTrigger: { trigger: ".gallery-masonry", start: "top 85%" },
    opacity: 0,
    y: 30,
    stagger: 0.06,
    duration: 0.9,
    ease: "power3.out",
  });
}
