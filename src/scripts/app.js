"use strict";

gsap.registerPlugin(TextPlugin);

  gsap.set(".terminal-list", { autoAlpha: 0 });

  const tl = gsap.timeline();

  const mainElements = document.querySelectorAll(".terminal-text");
  
  mainElements.forEach((element) => {
    const originalContent = element.innerHTML;
    element.innerHTML = "";
    const typingSpeed = originalContent.length * 0.010;

    tl.to(element, {
      text: { value: originalContent },
      duration: typingSpeed,
      ease: "none"
    });
  });

  tl.set(".terminal-list", { autoAlpha: 1 });
