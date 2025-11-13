/* ==========================================================
   Serenity Hair – Final JavaScript (multi-gallery ready)
   Features:
   ✅ Language switch (EN / FR)
   ✅ Works with one cover (#openGallery) OR three bubbles (.bubble)
   ✅ Lightbox with arrows + mobile swipe
   ✅ No console errors
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
     inspirationTitle: "What Inspired Serenity Hair",
inspirationText: "Serenity Hair was born from a personal journey. After experiencing hair loss, our founder searched endlessly for extensions that looked natural, but everything she tried felt artificial and obvious. That changed the day she discovered invisible extensions. For the first time, she saw herself again — confident, elegant, and effortlessly beautiful. Serenity Hair was created to share that same feeling with others.",
whyChooseTitle: " Why Choose Us",
whyChooseText: "Because you deserve the best. Our extensions are crafted from the highest-quality hair on the market and designed to blend seamlessly with your natural texture. Each strand moves, shines, and feels just like your own — giving you a flawless, undetectable finish that lasts.",
originalTitle: "Original Prices",

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
     inspirationTitle: "Ce qui a inspiré Serenity Hair",
inspirationText: "Serenity Hair est née d’un parcours personnel. Après avoir connu une perte de cheveux, notre fondatrice a cherché sans relâche des extensions naturelles, mais tout semblait artificiel et évident. Tout a changé le jour où elle a découvert les extensions invisibles. Pour la première fois, elle s’est revue — confiante, élégante et naturellement belle. Serenity Hair a été créée pour partager ce sentiment avec d’autres femmes.",
whyChooseTitle: " Pourquoi nous choisir",
whyChooseText: "Parce que vous méritez ce qu’il y a de mieux. Nos extensions sont fabriquées à partir des cheveux de la plus haute qualité sur le marché et sont conçues pour se fondre parfaitement avec votre texture naturelle. Chaque mèche bouge, brille et se ressent comme la vôtre, pour un résultat impeccable et indétectable qui dure.",
originalTitle: "Tarifs d’origine",
  },
};

/* ---------- APP BOOT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  /* Language switch */
  let currentLang = "en";
  function applyText(lang) {
    currentLang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (TEXT[lang][key]) el.innerText = TEXT[lang][key];
    });
  }
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
  applyText("en"); // default

  /* ---------- LIGHTBOX (supports single cover OR three bubbles) ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const leftArrow  = document.querySelector(".lightbox .arrow.left");
  const rightArrow = document.querySelector(".lightbox .arrow.right");
  const closeBtn   = document.querySelector(".lightbox .close");

  // Define all galleries (use your exact filenames)
  const galleries = {
    main: [
      "images/WhatsApp Image 2025-10-23 at 9.05.27 PM (1).jpeg",
      "images/WhatsApp Image 2025-10-23 at 9.05.27 PM.jpeg",
      "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (6).jpeg",
      "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (4).jpeg",
      "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (3).jpeg",
      "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (2).jpeg"
    ],
    beforeafter: [
      "images/Before after minimal skincare Instagram post.png",
      "images/HAIR EXTENSIONS.jpeg"
      // cover image for this bubble is (5).jpeg, set in HTML, not needed here
    ],
    bands: [
      "images/WhatsApp Image 2025-10-24 at 11.33.20 PM.jpeg",
      "images/WhatsApp Image 2025-10-25 at 6.14.36 PM.jpeg",
      "images/WhatsApp Image 2025-10-25 at 6.14.37 PM (1).jpeg",
      "images/WhatsApp Image 2025-10-25 at 6.14.37 PM.jpeg"
    ]
  };

  let currentIndex = 0;
  let currentGallery = [];

  // A) Support your original single cover (id="openGallery") → open MAIN gallery
  const openGallery = document.getElementById("openGallery");
  if (openGallery && lightbox && lightboxImg) {
    openGallery.addEventListener("click", () => {
      currentGallery = galleries.main.slice();
      currentIndex = 0;
      lightboxImg.src = currentGallery[currentIndex];
      lightbox.classList.add("active");
    });
  }

  // B) Support the three bubbles (.bubble[data-gallery])
  document.querySelectorAll(".bubble").forEach((bubble) => {
    bubble.addEventListener("click", () => {
      const galleryName = bubble.getAttribute("data-gallery");
      currentGallery = (galleries[galleryName] || []).slice();
      currentIndex = 0;
      if (currentGallery.length) {
        lightboxImg.src = currentGallery[currentIndex];
        lightbox.classList.add("active");
      }
    });
  });

  // Navigation + Close + Swipe
  if (leftArrow) {
    leftArrow.addEventListener("click", () => {
      if (!currentGallery.length) return;
      currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
      lightboxImg.src = currentGallery[currentIndex];
    });
  }
  if (rightArrow) {
    rightArrow.addEventListener("click", () => {
      if (!currentGallery.length) return;
      currentIndex = (currentIndex + 1) % currentGallery.length;
      lightboxImg.src = currentGallery[currentIndex];
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  }

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
/* ---------- BOOKING FORM ENCODING FIX ---------- */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("booking-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    // Prevent default mailto behavior
    e.preventDefault();

    // Collect and encode all form data
    const name = encodeURIComponent(form.name.value);
    const email = encodeURIComponent(form.email.value);
    const service = encodeURIComponent(form.service.value);
    const date = encodeURIComponent(form.date.value);
    const time = encodeURIComponent(form.time.value);
    const message = encodeURIComponent(form.message.value);

    // Structure the email body nicely with line breaks
    const body =
      `Name: ${name}%0D%0A` +
      `Email: ${email}%0D%0A` +
      `Service: ${service}%0D%0A` +
      `Date: ${date}%0D%0A` +
      `Time: ${time}%0D%0A` +
      `Message: ${message}`;

    // Optional — subject line that includes name and date
    const subject = encodeURIComponent(`Booking – ${form.name.value} – ${form.date.value}`);

    // Update the mailto action dynamically
    window.location.href = `mailto:serenityhair.fr@gmail.com?subject=${subject}&body=${body}`;
  });
});
/* ---------- MOBILE MENU + SEARCH ---------- */
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenu = document.getElementById("close-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.add("open");
    });
  }

  if (closeMenu && mobileMenu) {
    closeMenu.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  }

  // Close menu when clicking outside inner panel
  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove("open");
      }
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      });
    });
  }

  // Search toggle
  const searchToggle = document.getElementById("search-toggle");
  const searchBar = document.getElementById("search-bar");
  const searchForm = document.getElementById("site-search-form");
  const searchInput = document.getElementById("site-search-input");

  if (searchToggle && searchBar) {
    searchToggle.addEventListener("click", () => {
      searchBar.classList.toggle("show");
      if (searchBar.classList.contains("show") && searchInput) {
        searchInput.focus();
      }
    });
  }

  // Very simple on-page search: scroll to first matching text
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = searchInput.value.trim().toLowerCase();
      if (!q) return;

      const candidates = document.querySelectorAll("h1, h2, h3, p");
      let target = null;

      candidates.forEach((el) => {
        if (!target && el.innerText.toLowerCase().includes(q)) {
          target = el;
        }
      });

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        target.classList.add("search-highlight");
        setTimeout(() => {
          target.classList.remove("search-highlight");
        }, 2000);
      } else {
        alert("No matching content found.");
      }
    });
  }
});
