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

/* ---------- HOURS RENDER ---------- */
function renderHours(){
  const ul = $('#hoursList');
  ul.innerHTML = '';
  Object.keys(hours).forEach(k=>{
    const h = hours[k];
    const li = document.createElement('li');
    const open = (h.open === 'closed') ? 'Closed' : `${h.open} - ${h.close}`;
    li.innerText = `${h.label.replace('/', ' / ')}: ${ (h.open==='closed') ? (currentLang==='fr' ? 'Fermé' : 'Closed') : `${h.open} - ${h.close}`}`;
    ul.appendChild(li);
  });
}
renderHours();

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

/* ---------- Send booking (mailto) ---------- */
$('#send-booking').addEventListener('click', ()=>{
  const name = $('#client-name').value.trim();
  const email = $('#client-email').value.trim();
  const phone = $('#client-telephone').value.trim();
  const slot = $('#selected-slot').value.trim();
  const notes = $('#notes').value.trim();

  if(!name || !email || !slot){
    alert(currentLang === 'fr' ? 'Veuillez remplir votre nom, email et sélectionner un créneau.' : 'Please enter your name, email, and select a slot.');
    return;
  }

  const subject = encodeURIComponent(`Booking request — ${name}`);
  const bodyLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Requested slot: ${slot}`,
    `Service: Invisible Tape-In Extensions (20 / 40 / 60 bands)`,
    `Notes: ${notes}`
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));

  // mailto link opens user's email client with prefilled email to the salon
  window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
});

/* ---------- SMALL UX: gallery click to open image in new tab ---------- */
document.addEventListener('click', function(e){
  if(e.target.classList.contains('gallery-item')){
    window.open(e.target.src, '_blank');
  }
});
// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImages = document.querySelectorAll('.gallery img');
let currentIndex = 0;

galleryImages.forEach((img, i) => {
  img.addEventListener('click', () => {
    currentIndex = i;
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  });
});

document.querySelector('.lightbox .close').addEventListener('click', () => {
  lightbox.classList.remove('active');
});

document.querySelector('.lightbox .arrow.left').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
});

document.querySelector('.lightbox .arrow.right').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
});

// Swipe on mobile
let startX = 0;
lightbox.addEventListener('touchstart', e => startX = e.touches[0].clientX);
lightbox.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (endX < startX - 50) document.querySelector('.lightbox .arrow.right').click();
  if (endX > startX + 50) document.querySelector('.lightbox .arrow.left').click();
});


/* ---------- ADMIN NOTE ----------
 To change hours: edit the `hours` object at top of this file.
 To mark slots as booked: add ISO date strings in `bookedSlots` array.
 To replace hero/gallery images: upload files to /images and update filenames in HTML.
 To change discount/remove it: remove #discount element in index.html or hide via CSS.
*/
