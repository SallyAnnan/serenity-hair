/* script.js
   Edit availability, booked slots, and text here.
   - Replace images by uploading files to /images with filenames used below.
   - To edit hours, change `hours` object.
   - To mark a slot as booked (for testing), add an ISO datetime in bookedSlots array.
*/

/* ---------- SITE TEXT (EN + FR) ---------- */
const TEXT = {
  en: {
    heroHeadline: "Luxury Invisible Extensions for Effortless Confidence",
    heroSub: "At Serenity Hair, we redefine luxury through precision, comfort, and elegance.",
    ctaBook: "Book Your Appointment",
    ctaServices: "View Services",
    aboutTitle: "About Serenity Hair",
    aboutText: "Serenity Hair is a luxury hair brand dedicated to natural-looking, exquisite extensions. We craft each install with meticulous attention so every client leaves feeling confident and elegant. Our invisible strand-by-strand method blends seamlessly for a discreet, comfortable finish.",
    servicesTitle: "Services & Pricing",
    serviceName: "Invisible Tape-In Extensions",
    serviceDetails: "Invisible injected adhesive bands — strand-by-strand application. 1 pack = 20 bands (50g) • length 55 cm",
    price20: "20 bands (1 pack)",
    price40: "40 bands (2 packs)",
    price60: "60 bands (3 packs)",
    discountText: "Launch offer: 10% off your first appointment.",
    galleryTitle: "Gallery",
    gallerySub: "Click any image to enlarge. Replace these images in /images to update.",
    bookingTitle: "Book an Appointment",
    bookingSub: "Choose a date and an available one-hour slot. Bookings are confirmed by email.",
    chooseDate: "Choose a date",
    bookButton: "Send Booking Request",
    hoursTitle: "Opening Hours",
    contactTitle: "Contact"
  },
  fr: {
    heroHeadline: "Extensions invisibles de luxe pour une confiance naturelle",
    heroSub: "Chez Serenity Hair, nous réinventons le luxe par la précision, le confort et l'élégance.",
    ctaBook: "Réserver un rendez-vous",
    ctaServices: "Voir les services",
    aboutTitle: "À propos de Serenity Hair",
    aboutText: "Serenity Hair est une marque capillaire de luxe dédiée aux extensions au rendu naturel. Chaque pose est exécutée avec soin pour que chaque cliente reparte confiante et élégante. Notre méthode mèche-par-mèche offre une finition discrète et confortable.",
    servicesTitle: "Services & Tarifs",
    serviceName: "Extensions Invisible Tape-In",
    serviceDetails: "Bandes adhésives injectées invisibles — pose mèche à mèche. 1 paquet = 20 bandes (50g) • longueur 55 cm",
    price20: "20 bandes (1 paquet)",
    price40: "40 bandes (2 paquets)",
    price60: "60 bandes (3 paquets)",
    discountText: "Offre de lancement : -10 % sur votre premier rendez-vous.",
    galleryTitle: "Galerie",
    gallerySub: "Cliquez une image pour agrandir. Remplacez les images dans /images pour mettre à jour.",
    bookingTitle: "Réserver un rendez-vous",
    bookingSub: "Choisissez une date et un créneau d'une heure disponible. Les réservations sont confirmées par email.",
    chooseDate: "Choisir une date",
    bookButton: "Envoyer la demande",
    hoursTitle: "Horaires d'ouverture",
    contactTitle: "Contact"
  }
};

/* ---------- OPENING HOURS (edit here) ----------
  Format: opening and closing (24h). "closed" means day closed.
  Keys: 0 = Sunday, 1 = Monday, ... 6 = Saturday
*/
const hours = {
  0: { label: "Sunday / Dimanche", open: "closed", close: "closed" },
  1: { label: "Monday / Lundi", open: "closed", close: "closed" },
  2: { label: "Tuesday / Mardi", open: "12:00", close: "19:00" },
  3: { label: "Wednesday / Mercredi", open: "12:00", close: "19:00" },
  4: { label: "Thursday / Jeudi", open: "12:00", close: "19:00" },
  5: { label: "Friday / Vendredi", open: "12:00", close: "19:00" },
  6: { label: "Saturday / Samedi", open: "10:00", close: "16:00" }
};

/* ---------- BOOKED SLOTS (edit here to pre-block slots)
   Add booked slots as ISO strings: "2025-10-29T13:00"
   The format must match local date used by the client.
*/
const bookedSlots = [
  // Example: "2025-10-30T13:00"
];

/* ---------- CONFIG ---------- */
const OWNER_EMAIL = "serenityhair.fr@gmail.com";

/* ---------- UTILITY FUNCTIONS ---------- */
function $(sel){return document.querySelector(sel);}
function $all(sel){return Array.from(document.querySelectorAll(sel));}

/* ---------- LANGUAGE SWITCH ---------- */
let currentLang = 'en';
function applyText(lang){
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(TEXT[lang][key]) el.innerText = TEXT[lang][key];
  });
}
document.getElementById('lang-en').addEventListener('click',()=>{
  $('#lang-en').classList.add('active'); $('#lang-fr').classList.remove('active'); applyText('en');
});
document.getElementById('lang-fr').addEventListener('click',()=>{
  $('#lang-fr').classList.add('active'); $('#lang-en').classList.remove('active'); applyText('fr');
});
applyText('en'); // default


/* ---------- SLOT GENERATION ---------- */
/* For chosen date, generate 1-hour slots between open and close */
function generateSlotsFor(dateStr){
  const date = new Date(dateStr);
  const day = date.getDay();
  const dayHours = hours[day];
  const slotsContainer = $('#slots');
  slotsContainer.innerHTML = '';
  if(!dayHours || dayHours.open === 'closed'){
    slotsContainer.innerHTML = `<div class="muted">${currentLang === 'fr' ? 'Fermé ce jour-là' : 'Closed that day'}</div>`;
    return;
  }

  function toDateTime(date, hhmm){
    const [hh, mm] = hhmm.split(':').map(Number);
    const d = new Date(date);
    d.setHours(hh, mm, 0, 0);
    return d;
  }
  const open = toDateTime(date, dayHours.open);
  const close = toDateTime(date, dayHours.close);

  // create 1-hour slots (end at close)
  let slot = new Date(open);
  const now = new Date();
  while(slot.getTime() + 60*60*1000 <= close.getTime()){
    const slotISO = slot.toISOString().slice(0,16); // "YYYY-MM-DDTHH:MM"
    const slotLabel = slot.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    const slotEl = document.createElement('button');
    slotEl.className = 'slot';
    slotEl.innerText = slotLabel;
    // check booked
    const isoForBooked = slot.toISOString().slice(0,16);
    const isBooked = bookedSlots.some(b => b.startsWith(isoForBooked));
    if(isBooked || slot < now){
      slotEl.classList.add('booked');
      slotEl.disabled = true;
    } else {
      // click to select
      slotEl.addEventListener('click', ()=> {
        $all('.slot').forEach(s=>s.classList.remove('selected'));
        slotEl.classList.add('selected');
        $('#selected-slot').value = `${date.toISOString().slice(0,10)} ${slotLabel}`;
      });
    }
    slotsContainer.appendChild(slotEl);
    slot = new Date(slot.getTime() + 60*60*1000);
  }
}

/* date input behavior */
const dateInput = $('#booking-date');
// default to next available day (today or next open day)
function setDefaultDate(){
  const d = new Date();
  d.setDate(d.getDate() + 1);
  dateInput.value = d.toISOString().slice(0,10);
  generateSlotsFor(dateInput.value);
}
dateInput.addEventListener('change', ()=> generateSlotsFor(dateInput.value));
setDefaultDate();


// Serenity Hair - Click-to-Open Gallery Lightbox

document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const openGallery = document.getElementById('openGallery');

  // Your 9 images
  const galleryImages = [
    "images/WhatsApp Image 2025-10-23 at 9.05.27 PM (1).jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.27 PM.jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (6).jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (5).jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (4).jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (3).jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (2).jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.04 PM (1).jpeg",
    "images/WhatsApp Image 2025-10-23 at 9.05.04 PM.jpeg"
  ];

  let currentIndex = 0;

  if (openGallery) {
    openGallery.addEventListener('click', () => {
      currentIndex = 0;
      lightboxImg.src = galleryImages[currentIndex];
      lightbox.classList.add('active');
    });
  }

  // Close
  document.querySelector('.lightbox .close').addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  // Left
  document.querySelector('.lightbox .arrow.left').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
  });

  // Right
  document.querySelector('.lightbox .arrow.right').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
  });

  // Swipe on mobile
  let startX = 0;
  lightbox.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  lightbox.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (endX < startX - 50) document.querySelector('.lightbox .arrow.right').click();
    if (endX > startX + 50) document.querySelector('.lightbox .arrow.left').click();
  });
});



/* ---------- ADMIN NOTE ----------
 To change hours: edit the `hours` object at top of this file.
 To mark slots as booked: add ISO date strings in `bookedSlots` array.
 To replace hero/gallery images: upload files to /images and update filenames in HTML.
 To change discount/remove it: remove #discount element in index.html or hide via CSS.
*/
