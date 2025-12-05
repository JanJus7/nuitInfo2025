"use client";
import { useEffect, useRef } from "react";

export default function Animation() {
  const containerRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    let validationStep = 0;
    let lastStepTime = 0;

    const resetValidation = () => {
      validationStep = 0;
      lastStepTime = 0;
      if (btnRef.current) {
        btnRef.current.style.transform = "none";
        btnRef.current.style.opacity = "1";
      }
    };

    const inputs = document.querySelectorAll(".frustrating-input");

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
      }

      input.dataset.realValue = realValue;

      const targetId = input.dataset.realTarget;
      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) targetEl.value = realValue;
      }

      resetValidation();

      input.value = realValue.length > 0 ? shuffleString(realValue) : "";
    };

    const handleMouseOver = (e) => {
      const input = e.target;
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const inputRect = input.getBoundingClientRect();

      const maxX = containerRect.width - inputRect.width;
      const maxY = containerRect.height - inputRect.height;

      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;

      input.style.position = "absolute";
      input.style.left = `${newX}px`;
      input.style.top = `${newY}px`;
      input.style.transform = "none";
    };

    inputs.forEach((input) => {
      input.dataset.realValue = "";
      input.addEventListener("input", handleInput);
      input.addEventListener("mouseover", handleMouseOver);
    });

    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        inputs.forEach((input) => {
          input.dispatchEvent(new Event("mouseover"));
        });
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    const handleBtnClick = () => {
      const realNom = document.getElementById("realNom").value;
      const realPrenom = document.getElementById("realPrenom").value;

      const title = document.getElementById("title");

      if (!realNom && !realPrenom) return;

      title.innerHTML = `Bonjour : ${realNom} ${realPrenom}`;

      inputs.forEach((i) => (i.style.visibility = "hidden"));
      btnRef.current.style.visibility = "hidden";

      setTimeout(() => {
        title.innerHTML = "Remplissez le formulaire";
        inputs.forEach((i) => {
          i.value = "";
          i.dataset.realValue = "";
          i.style.visibility = "visible";
        });
        document.getElementById("realNom").value = "";
        document.getElementById("realPrenom").value = "";
        btnRef.current.style.visibility = "visible";
        resetValidation();
      }, 5000);
    };

    btnRef.current?.addEventListener("click", handleBtnClick);

    const handleMouseMove = (e) => {
      const realNom = document.getElementById("realNom").value;
      const realPrenom = document.getElementById("realPrenom").value;

      if (!realNom || !realPrenom || validationStep === 3) return;

      const rect = btnRef.current.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const distance = Math.hypot(
        e.clientX - btnCenterX,
        e.clientY - btnCenterY
      );

      if (Date.now() - lastStepTime < 500) return;

      if (distance < 100) {
        if (validationStep === 0) {
          btnRef.current.style.transform = "translateX(-45vw)";
          validationStep = 1;
        } else if (validationStep === 1) {
          btnRef.current.style.transform = "translateX(45vw)";
          validationStep = 2;
        } else if (validationStep === 2) {
          btnRef.current.style.transform = "none";
          validationStep = 3;
        }
        lastStepTime = Date.now();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("input", handleInput);
        input.removeEventListener("mouseover", handleMouseOver);
      });
      document.removeEventListener("keydown", handleKeyDown);
      btnRef.current?.removeEventListener("click", handleBtnClick);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center bg-gradient-to-br from-indigo-100 to-teal-50 border-8 border-indigo-500"
    >
      <h1
        id="title"
        className="mt-12 text-3xl font-bold text-indigo-700 drop-shadow"
      >
        Remplissez le formulaire
      </h1>

      <input
        type="text"
        id="frustratingInput"
        className="frustrating-input absolute top-[40%] left-1/2 -translate-x-1/2 px-5 py-3 rounded-lg border-2 border-indigo-300 bg-white shadow"
        placeholder="Ton nom"
        data-real-target="realNom"
        autoComplete="off"
      />

      <input
        type="text"
        id="frustratingInputPrenom"
        className="frustrating-input absolute top-[60%] left-1/2 -translate-x-1/2 px-5 py-3 rounded-lg border-2 border-indigo-300 bg-white shadow"
        placeholder="Ton prénom"
        data-real-target="realPrenom"
        autoComplete="off"
      />

      <input type="hidden" id="realNom" />
      <input type="hidden" id="realPrenom" />

      <button
        ref={btnRef}
        className="mt-[400px] rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 px-10 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105"
      >
        Voir le résultat
      </button>
    </div>
  );
}