
"use strict";

// ===== MOBILE MENU =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu" : "Buka menu"
    );
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka menu");
    });
  });

  document.addEventListener("click", function (event) {
    if (
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ===== PROFILE PHOTO FALLBACK =====
const profilePhoto = document.getElementById("profilePhoto");
const photoPlaceholder = document.getElementById("photoPlaceholder");

function showPhotoPlaceholder() {
  if (profilePhoto) {
    profilePhoto.style.display = "none";
  }

  if (photoPlaceholder) {
    photoPlaceholder.style.display = "flex";
  }
}

if (profilePhoto && photoPlaceholder) {
  profilePhoto.addEventListener("error", showPhotoPlaceholder);

  profilePhoto.addEventListener("load", function () {
    profilePhoto.style.display = "block";
    photoPlaceholder.style.display = "none";
  });

  if (profilePhoto.complete) {
    if (profilePhoto.naturalWidth > 0) {
      profilePhoto.style.display = "block";
      photoPlaceholder.style.display = "none";
    } else {
      showPhotoPlaceholder();
    }
  }
}

// ===== SCROLL REVEAL =====
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
} else {
  revealItems.forEach(function (item) {
    item.classList.add("visible");
  });
}

// ===== HERO TEXT ROTATION =====
const typeText = document.getElementById("typeText");

const phrases = [
  "website keren.",
  "ide kreatif.",
  "pengalaman digital.",
  "masa depan."
];

let phraseIndex = 0;

if (typeText) {
  typeText.textContent = phrases[0];

  window.setInterval(function () {
    phraseIndex = (phraseIndex + 1) % phrases.length;

    typeText.textContent = phrases[phraseIndex];

    if (typeof typeText.animate === "function") {
      typeText.animate(
        [
          { opacity: 0, transform: "translateY(5px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        {
          duration: 400,
          easing: "ease-out"
        }
      );
    }
  }, 2600);
}

// ===== CURRENT YEAR =====
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
