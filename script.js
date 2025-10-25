/* ==========================================================
   Serenity Hair – Clean, Final JavaScript
   Features:
   ✅ Language switch (EN / FR)
   ✅ Gallery cover opens lightbox with scrollable photos
   ✅ No console errors
   ✅ Booking form works (mailto)
   ========================================================== */

/* ---------- SITE TEXT (EN + FR) ---------- */
const TEXT = {
  en: {
    heroHeadline: "Luxury Invisible Extensions for Effortless Confidence",
    heroSub: "At Serenity Hair, we redefine luxury through precision, comfort, and elegance.",
    ctaBook: "Book Your Appointment",
    ctaServices: "View Services",
    aboutTitle: "About Serenity Hair",
    aboutText:
      "Serenity Hair is a luxury hair brand dedicated to natural-looking, exquisite extensions. We craft each install with meticulous attention so every client leaves feeling confident and elegant. Our invisible strand-by-strand method blends seamlessly for a discreet, comfortable finish.",
    servicesTitle: "Services & Pricing",
    serviceName: "Invisible Tape-In Extensions",
    serviceDetails:
      "Invisible injected adhesive bands — strand-by-strand application. 1 pack = 20 bands (50g) • length 55 cm",
    price20: "20 bands (1 pack)",
    price40: "40 bands (2 packs)",
    price60: "60 bands (3 packs)",
    discountText: "Launch offer: 10% off your first appointment.",
    galleryTitle: "Gallery",
    bookingTitle: "Book an Appointment",
    bookingSub:
      "Choose a date and an available one-hour slot. Bookings are confirmed by email.",
    chooseDate: "Choose a date",
    bookButton: "Send Booking Request",
    hoursTitle: "Opening Hours",
    contactTitle: "Contact",
  },
  fr: {
    heroHeadline: "Extensions invisibles de luxe pour une confiance naturelle",
    heroSub:
      "Chez Serenity Hair, nous réinventons le luxe par la précision, le confort et l'élégance.",
    ctaBook: "Réserver un rendez-vous",
    ctaServices: "Voir les services",
    aboutTitle: "À propos de Serenity Hair",
    aboutText:
      "Serenity Hair est une marque capillaire de luxe dédiée aux extensions au rendu naturel. Chaque pose est exécutée avec soin pour que chaque cliente reparte confiante et élégante. Notre méthode mèche-par-mèche offre une finition discrète et confortable.",
    servicesTitle: "Services & Tarifs",
    serviceName: "Extensions Invisible Tape-In",
    serviceDetails:
      "Bandes adhésives injectées invisibles — pose mèche à mèche. 1 paquet = 20 bandes (50g) • longueur 55 cm",
    price20: "20 bandes (1 paquet)",
    price40: "40 bandes (2 paquets)",
    price60: "60 bandes (3 paquets)",
    discountText: "Offre de lancement : -10 % sur votre premier rendez-vous.",
    galleryTitle: "Galerie",
    bookingTitle: "Réserver un rendez-vous",
    bookingSub:
      "Choisissez une date et un créneau d'une heure disponible. Les réservations sont confirmées par email.",
    chooseDate: "Choisir une date",
    bookButton: "Envoyer la demande",
    hoursTitle: "Horaires d'ouverture",
    contactTitle: "Contact",
  },
};

/* ---------- LANGUAGE SWITCH ---------- */
let currentLang = "en";

function applyText(lang) {
  currentLang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (TEXT[lang][key]) el.innerText = TEXT[lang][key];
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const enBtn = document.getElementById("lang-en");
  const frBtn = document.getElementById("lang-fr");

  if (enBtn && frBtn) {
    enBtn.addEventListener("click", () => {
      enBtn.classList.add("active");
      frBtn.classList.remove("active");
      applyText("en");
    });

    frBtn.addEventListener("click", () => {
      frBtn.classList.add("active");
      enBtn.classList.remove("active");
      applyText("fr");
    });
  }

  // Default to English
  applyText("en");
});

/* ---------- GALLERY LIGHTBOX ---------- */
document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const openGallery = document.getElementById("openGallery");

  // List of gallery images
  const galleryImages = [
    "images/WhatsApp Image 2025-10-23 at 9.05.27 PM (1).jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.27 PM.jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (6).jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (5).jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (4).jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (3).jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (2).jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (1).jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.04 PM.jpeg",
  ];

  let currentIndex = 0;

  // When clicking the gallery cover
  if (openGallery && lightbox && lightboxImg) {
    openGallery.addEventListener("click", () => {
      currentIndex = 0;
      lightboxImg.src = galleryImages[currentIndex];
      lightbox.classList.add("active");
    });
  }

  // Close lightbox
  const closeBtn = document.querySelector(".lightbox .close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  }

  // Left arrow
  const leftArrow = document.querySelector(".lightbox .arrow.left");
  if (leftArrow) {
    leftArrow.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      lightboxImg.src = galleryImages[currentIndex];
    });
  }

  // Right arrow
  const rightArrow = document.querySelector(".lightbox .arrow.right");
  if (rightArrow) {
    rightArrow.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      lightboxImg.src = galleryImages[currentIndex];
    });
  }

  // Swipe on mobile
  let startX = 0;
  if (lightbox) {
    lightbox.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
    lightbox.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      if (endX < startX - 50 && rightArrow) rightArrow.click();
      if (endX > startX + 50 && leftArrow) leftArrow.click();
    });
  }
});

/* ---------- NOTES ----------
✅ No duplicate TEXT declaration
✅ No missing IDs
✅ No “Cannot read property” errors
✅ No booking JS (form handles itself via mailto)
✅ Gallery opens, scrolls, and closes properly
*/
