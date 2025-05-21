gsap.registerPlugin(ScrollTrigger);
const contents = gsap.utils.toArray("#scrollContainer .content");
const scrollImages = document.querySelector(".scroll-items");
const textItems = document.querySelector(".textItems");

// Scroll animatie voor de content-secties
gsap.to(contents, {
  xPercent: -100 * (contents.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: "#scrollContainer",
    pin: true,
    scrub: 0.5,
    snap: {
      snapTo: gsap.utils.snap(1 / (contents.length - 1)), // snap per sectie
      duration: 0.15,
      ease: "power1.inOut"
    }
  }
});

// scroll de voorste foto's horizontaal
gsap.to(scrollImages, {
  x: 0,
  ease: "none",
  scrollTrigger: {
    trigger: "#scrollContainer",
    start: "top top",
    end: "bottom -0%",
    scrub: true,
  }
});

// scroll de tekst
gsap.to(textItems, {
    y: -480,
    ease: "none",
    scrollTrigger: {
      trigger: "#scrollContainer",
      start: "top top",
      end: "bottom -0%",
      scrub: true,
    }
  });

ScrollTrigger.create({
    trigger: "#scrollContainer",
    start: "top 25%",
    end: "bottom -10%",
    onEnter: () => gsap.to("#imgScrollContainer", {opacity: 1, height: 500, duration: 0.3}),
    onLeave: () => gsap.to("#imgScrollContainer", {opacity: 0, height: 0, duration: 0.3}),
    onEnterBack: () => gsap.to("#imgScrollContainer", {opacity: 1, height: 500, duration: 0.3}),
    onLeaveBack: () => gsap.to("#imgScrollContainer", {opacity: 0, height: 0, duration: 0.3}),
  });


  ScrollTrigger.create({
    trigger: "#scrollContainer",
    start: "top 25%",
    end: "bottom -10%",
    onEnter: () => gsap.to("#textScrollContainer", {opacity: 1, duration: 0.3}),
    onLeave: () => gsap.to("#textScrollContainer", {opacity: 0, duration: 0.3}),
    onEnterBack: () => gsap.to("#textScrollContainer", {opacity: 1, duration: 0.3}),
    onLeaveBack: () => gsap.to("#textScrollContainer", {opacity: 0, duration: 0.3}),
  });