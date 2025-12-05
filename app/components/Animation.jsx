"use client";

import React, { useEffect } from "react";

export default function Animation() {
  useEffect(() => {
    // Variables pour la séquence de validation

    let validationStep = 0; // 0: Init, 1: Left, 2: Right, 3: Center (Valid)

    let lastStepTime = 0; // Pour éviter les changements d'état trop rapides

    function resetValidation() {
      validationStep = 0;

      lastStepTime = 0;

      const btn = document.getElementById("showResultBtn");

      if (btn) {
        btn.style.transform = "none";

        btn.style.opacity = "1";
      }
    }

    // Sélectionner tous les champs frustrants

    const inputs = document.querySelectorAll(".frustrating-input");

    // Fonction pour mélanger une chaîne de caractères

    function shuffleString(str) {
      const arr = str.split("");

      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
      }

      return arr.join("");
    }

    const handleInput = (e) => {
      const input = e.target;

      let realValue = input.dataset.realValue || "";

      if (e.inputType === "insertText" && e.data) {
        realValue += e.data;
      } else if (e.inputType === "deleteContentBackward") {
        realValue = realValue.slice(0, -1);
      } else {
        // Cas fallback (ex: copier-coller ou autre), on essaie de deviner

        const diff = input.value.length - realValue.length;

        if (diff < 0) {
          realValue = realValue.slice(0, diff);
        }
      }

      input.dataset.realValue = realValue;

      // Mettre à jour le champ caché correspondant

      const targetId = input.dataset.realTarget;

      if (targetId) {
        const targetEl = document.getElementById(targetId);

        if (targetEl) targetEl.value = realValue;
      }

      // Réinitialiser la validation si on change une valeur

      resetValidation();

      // Afficher la version mélangée

      if (realValue.length > 0) {
        input.value = shuffleString(realValue);
      } else {
        input.value = "";
      }
    };

    const handleMouseOver = (e) => {
      const input = e.target;

      const container = document.querySelector(".container");

      if (!container) return;

      // Afficher le défi quand ça bouge

      const title = document.querySelector(".container h1");

      if (title && !title.innerHTML.includes("si vous pouvez")) {
        title.innerHTML = "Remplissez le formulaire... si vous pouvez";
      }

      const containerRect = container.getBoundingClientRect();

      const inputRect = input.getBoundingClientRect();

      // Calculer des nouvelles coordonnées aléatoires dans le conteneur

      const maxX = containerRect.width - inputRect.width;

      const maxY = containerRect.height - inputRect.height;

      const newX = Math.random() * maxX;

      const newY = Math.random() * maxY;

      input.style.position = "absolute";

      input.style.transform = "none"; // Enlever le centrage initial

      input.style.left = `${newX}px`;

      input.style.top = `${newY}px`;
    };

    inputs.forEach((input) => {
      // Initialiser la vraie valeur

      input.dataset.realValue = "";

      input.addEventListener("input", handleInput);

      input.addEventListener("mouseover", handleMouseOver);
    });

    // 3. Empêcher la triche avec la touche Tab (Anti-Cheat)

    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        e.preventDefault(); // Bloque l'action par défaut

        // Punit le tricheur en faisant bouger TOUS les champs

        inputs.forEach((input) => {
          const event = new Event("mouseover");

          input.dispatchEvent(event);
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // 4. Afficher le résultat

    const showResultBtn = document.getElementById("showResultBtn");

    const resultDisplay = document.getElementById("resultDisplay");

    const handleBtnClick = () => {
      const realNom = document.getElementById("realNom").value;

      const realPrenom = document.getElementById("realPrenom").value;

      // Si les champs sont vides, on fait disparaître les inputs pendant 10 secondes sans afficher d'erreur

      if (!realNom && !realPrenom) {
        const inputNom = document.getElementById("frustratingInput");

        const inputPrenom = document.getElementById("frustratingInputPrenom");

        inputNom.style.visibility = "hidden";

        inputPrenom.style.visibility = "hidden";

        showResultBtn.style.visibility = "hidden";

        resultDisplay.innerHTML = "";

        setTimeout(() => {
          inputNom.style.visibility = "visible";

          inputPrenom.style.visibility = "visible";

          showResultBtn.style.visibility = "visible";
        }, 10000);

        return;
      }

      // Afficher le message à la place du titre

      const title = document.querySelector(".container h1");

      if (title) {
        title.innerHTML = `Bonjour : ${realNom} ${realPrenom}`;
      }

      // Masquer le formulaire et le bouton

      const inputNom = document.getElementById("frustratingInput");

      const inputPrenom = document.getElementById("frustratingInputPrenom");

      inputNom.style.visibility = "hidden";

      inputPrenom.style.visibility = "hidden";

      showResultBtn.style.visibility = "hidden";

      resultDisplay.innerHTML = "";

      // Réinitialiser la vue après quelques secondes

      setTimeout(() => {
        if (title) {
          title.innerHTML = "Remplissez le formulaire";
        }

        inputNom.value = "";

        inputPrenom.value = "";

        document.getElementById("realNom").value = "";

        document.getElementById("realPrenom").value = "";

        inputNom.dataset.realValue = "";

        inputPrenom.dataset.realValue = "";

        inputNom.style.left = "50%";

        inputNom.style.top = "40%";

        inputNom.style.transform = "translate(-50%, -50%)";

        inputPrenom.style.left = "50%";

        inputPrenom.style.top = "60%";

        inputPrenom.style.transform = "translate(-50%, -50%)";

        inputNom.style.visibility = "visible";

        inputPrenom.style.visibility = "visible";

        showResultBtn.style.visibility = "visible";
      }, 5000);
    };

    if (showResultBtn) {
      showResultBtn.addEventListener("click", handleBtnClick);
    }

    // 5. Faire déplacer le bouton quand la souris approche

    const handleMouseMove = (e) => {
      const realNom = document.getElementById("realNom");

      const realPrenom = document.getElementById("realPrenom");

      if (!realNom || !realPrenom) return;

      const valNom = realNom.value;

      const valPrenom = realPrenom.value;

      // Si les champs sont vides, on ne fait rien

      if (!valNom || !valPrenom) {
        return;
      }

      // Si validé, on reste fixe

      if (validationStep === 3) {
        showResultBtn.style.opacity = "1";

        showResultBtn.style.transform = "none";

        return;
      }

      const rect = showResultBtn.getBoundingClientRect();

      const btnCenterX = rect.left + rect.width / 2;

      const btnCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - btnCenterX, 2) +
          Math.pow(e.clientY - btnCenterY, 2)
      );

      const triggerDistance = 100;

      const now = Date.now();

      // Délai minimum entre chaque étape pour éviter l'enchaînement instantané

      if (now - lastStepTime < 500) return;

      if (distance < triggerDistance) {
        if (validationStep === 0) {
          showResultBtn.style.transform = "translateX(-45vw)";

          validationStep = 1;

          lastStepTime = now;
        } else if (validationStep === 1) {
          showResultBtn.style.transform = "translateX(45vw)";

          validationStep = 2;

          lastStepTime = now;
        } else if (validationStep === 2) {
          showResultBtn.style.transform = "none";

          showResultBtn.style.opacity = "1";

          validationStep = 3;

          lastStepTime = now;
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup function

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("input", handleInput);

        input.removeEventListener("mouseover", handleMouseOver);
      });

      document.removeEventListener("keydown", handleKeyDown);

      if (showResultBtn) {
        showResultBtn.removeEventListener("click", handleBtnClick);
      }

      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{`


                    body {


                        font-family: 'Geist', 'Montserrat', Arial, sans-serif;


                        height: 100vh;


                        margin: 0;


                        background: linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%);


                        color: #222;


                        overflow: hidden;


                    }





                    /* Cacher le header sur cette page spécifique */


                    header {


                        display: none !important;


                    }





                    .container {


                        text-align: center;


                        width: 100vw;


                        min-width: 100vw;


                        max-width: 100vw;


                        height: 100vh;


                        min-height: 100vh;


                        max-height: 100vh;


                        position: fixed;


                        top: 0;


                        left: 0;


                        margin: 0;


                        background: rgba(255,255,255,0.92);


                        border-radius: 0;


                        box-shadow: none;


                        padding: 48px 0 0 0;


                        backdrop-filter: blur(2px);


                        border: 8px solid #6366f1;


                        box-sizing: border-box;


                        z-index: 10;


                    }





                    h1 {


                        font-size: 2.2em;


                        font-weight: 700;


                        margin-bottom: 32px;


                        color: #4f46e5;


                        letter-spacing: 1px;


                        text-shadow: 0 2px 8px #e0e7ff;


                    }





                    label {


                        display: block;


                        margin-bottom: 12px;


                        font-size: 1.1em;


                        font-weight: 500;


                        color: #2563eb;


                        text-align: left;


                    }





                    input[type="text"] {


                        padding: 12px 18px;


                        font-size: 1.1em;


                        border: 2px solid #a5b4fc;


                        border-radius: 8px;


                        position: absolute;


                        transition: top 0.2s, left 0.2s, box-shadow 0.2s, border-color 0.2s;


                        left: 50%;


                        transform: translate(-50%, -50%);


                        background: linear-gradient(90deg, #f0fdfa 0%, #e0e7ff 100%);


                        color: #222;


                        box-shadow: 0 2px 12px rgba(79,70,229,0.08);


                        outline: none;


                    }


                    input[type="text"]:focus {


                        border-color: #6366f1;


                        box-shadow: 0 0 0 2px #6366f133;


                    }





                    #frustratingInput {


                        top: 40%;


                    }


                    #frustratingInputPrenom {


                        top: 60%;


                    }





                    button#showResultBtn {


                        display: inline-block;


                        padding: 14px 32px;


                        font-size: 1.1em;


                        font-weight: 600;


                        color: #fff;


                        background: linear-gradient(90deg, #6366f1 0%, #2563eb 100%);


                        border: none;


                        border-radius: 12px;


                        box-shadow: 0 2px 8px rgba(79,70,229,0.12);


                        cursor: pointer;


                        margin-top: 400px;


                        transition: background 0.2s, transform 0.2s;


                    }


                    button#showResultBtn:hover {


                        background: linear-gradient(90deg, #2563eb 0%, #6366f1 100%);


                        transform: scale(1.05);


                    }





                    .error-message {


                        color: #ef4444;


                        font-size: 2em;


                        font-weight: bold;


                        text-shadow: 0 2px 8px #fee2e2;


                    }





                    #resultDisplay {


                        margin-top: 20px;


                        font-weight: bold;


                        font-size: 1.3em;


                        color: #2563eb;


                        min-height: 2em;


                    }





                    @keyframes shake {


                        0%, 100% { transform: translateX(0); }


                        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }


                        20%, 40%, 60%, 80% { transform: translateX(10px); }


                    }


                    .shake {


                        animation: shake 0.5s;


                    }


                `}</style>

      <div className="container">
        <h1>Remplissez le formulaire</h1>

        <form action="#" method="post">
          <input
            type="text"
            id="frustratingInput"
            className="frustrating-input"
            name="nom"
            placeholder="Remplissez votre nom"
            autoComplete="off"
            tabIndex="-1"
            data-real-target="realNom"
          />

          <input
            type="text"
            id="frustratingInputPrenom"
            className="frustrating-input"
            name="prenom"
            placeholder="Et votre prénom ?"
            autoComplete="off"
            tabIndex="-1"
            data-real-target="realPrenom"
          />

          {/* Champs cachés pour stocker les vraies valeurs */}

          <input type="hidden" id="realNom" name="realNom" />

          <input type="hidden" id="realPrenom" name="realPrenom" />

          <button
            type="button"
            id="showResultBtn"
            style={{ marginTop: "400px" }}
          >
            Voir le résultat
          </button>
        </form>

        <div
          id="resultDisplay"
          style={{ marginTop: "20px", fontWeight: "bold" }}
        ></div>
      </div>
    </>
  );
}
