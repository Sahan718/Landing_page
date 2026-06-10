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
  tl.set(".terminal-prompt", { autoAlpha: 1, onComplete: () => {

      document.getElementById("cmd-input").focus(); 
  }});


  // SYSTÈME DE COMMANDES DU TERMINAL

  const cmdInput = document.getElementById("cmd-input");

  if (cmdInput) {
    // Fonction pour enlever les accents et mettre en minuscules (ex: "Crédits" -> "credits")
    const normalizeText = (text) => {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    };

    cmdInput.addEventListener("keydown", (e) => {
      // écoute uniquement la touche Enter
      if (e.key === "Enter") {
        const commandTyped = normalizeText(cmdInput.value);
        let matchFound = false;

        // Recup des liens
        const links = document.querySelectorAll(".terminal-list li a");

        links.forEach((link) => {
          const linkText = normalizeText(link.textContent);
          
          // Si la commande tapée correspond au texte du lien
          if (commandTyped === linkText) {
            matchFound = true;
            // On déclenche la redirection vers le href du lien
            window.location.href = link.href;
          }
        });

        // Si aucun match dans la commande
        if (!matchFound && commandTyped !== "") {
          cmdInput.value = "";
          cmdInput.placeholder = "Erreur";
          
          setTimeout(() => {
            cmdInput.placeholder = "";
          }, 1500);
        }
      }
    });
  }
