const events = [
  {id:"e1",title:"Afterglow Music Festival",category:"Music",date:"2026-12-12",time:"5:30 PM – 10:00 PM",venue:"Ekamra Kanan, Bhubaneswar",price:"₹799",description:"An open-air celebration of indie sounds, electric performances and the kind of energy that stays with you long after the last song.",image:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=80",longDescription:"Spend an evening under the open sky with live indie bands, immersive lights and a community of music lovers. Bring your friends, discover your next favourite artist and dance your way into the night.",day:"12",month:"DEC"},
  {id:"e2",title:"Future Forward Summit",category:"Technology",date:"2026-12-18",time:"9:00 AM – 4:00 PM",venue:"KIIT Convention Centre, Bhubaneswar",price:"₹499",description:"A day of bold ideas, emerging technology and conversations with the people building what comes next.",image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",longDescription:"Explore the ideas shaping tomorrow at a student-friendly technology summit. Expect engaging talks, practical sessions, networking opportunities and fresh perspectives on AI, design and entrepreneurship.",day:"18",month:"DEC"},
  {id:"e3",title:"The Art of Being Here",category:"Art",date:"2026-12-20",time:"11:00 AM – 6:00 PM",venue:"Odisha Crafts Museum, Bhubaneswar",price:"Free",description:"A vibrant showcase of local makers, contemporary art, thoughtful design and creative expression.",image:"https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80",longDescription:"Wander through a thoughtful mix of art installations, independent creators and hands-on creative corners. Meet local artists, try something new and take home a little inspiration.",day:"20",month:"DEC"},
  {id:"e4",title:"Slow Sunday: Wellness Edit",category:"Wellness",date:"2027-01-04",time:"7:00 AM – 10:00 AM",venue:"Forest Park, Bhubaneswar",price:"₹299",description:"Press pause with a morning of mindful movement, guided meditation and feel-good community energy.",image:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",longDescription:"Start your Sunday with gentle yoga, guided breathwork and a mindful reset in the fresh morning air. All experience levels are welcome; just bring a mat, water and an open mind.",day:"04",month:"JAN"},
  {id:"e5",title:"The Sunday Table",category:"Food",date:"2027-01-10",time:"12:00 PM – 4:00 PM",venue:"Trident Lawns, Bhubaneswar",price:"₹599",description:"Good food, local flavours and long conversations. Come hungry, leave with new favourites.",image:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",longDescription:"A relaxed food gathering celebrating regional flavours and independent food creators. Taste a range of small plates, meet the people behind the menus and enjoy an afternoon made for sharing.",day:"10",month:"JAN"},
  {id:"e6",title:"Frames & Frequencies",category:"Music",date:"2027-01-17",time:"4:00 PM – 8:30 PM",venue:"Museum of Tribal Arts & Artefacts, Bhubaneswar",price:"₹399",description:"Where visual storytelling meets sound. An intimate evening of short films, ambient sets and conversation.",image:"https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",longDescription:"Experience a curated evening where independent short films meet live experimental and ambient music. Stay for the post-screening conversations and connect with fellow storytellers.",day:"17",month:"JAN"}
];

const eventGrid = document.getElementById("eventGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("categoryFilters");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
let activeCategory = "All";

function formatDate(dateString) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
}
function renderEvents() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = events.filter(event => {
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    const searchable = `${event.title} ${event.category} ${event.venue} ${event.description}`.toLowerCase();
    return matchesCategory && searchable.includes(term);
  });
  eventGrid.innerHTML = filtered.map(event => `
    <article class="event-card">
      <div class="event-image">
        <img src="${event.image}" alt="${event.title}" loading="lazy">
        <span class="event-category">${event.category}</span>
        <span class="event-date-badge"><strong>${event.day}</strong><small>${event.month}</small></span>
      </div>
      <div class="event-info">
        <h3>${event.title}</h3><p>${event.description}</p>
        <div class="event-meta"><span>◷ ${formatDate(event.date)}</span><span>⌖ ${event.venue.split(",")[0]}</span></div>
        <div class="event-card-bottom"><span class="event-price">${event.price} <small>/ person</small></span>
          <button class="event-details" data-event="${event.id}">Explore event <span>↗</span></button></div>
      </div>
    </article>`).join("");
  resultCount.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? "experience" : "experiences"}`;
  emptyState.classList.toggle("hidden", filtered.length !== 0);
  eventGrid.classList.toggle("hidden", filtered.length === 0);
}
renderEvents();

filters.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  filters.querySelectorAll(".filter-chip").forEach(chip => chip.classList.toggle("active", chip === button));
  renderEvents();
});
searchInput.addEventListener("input", renderEvents);
document.getElementById("resetFilters").addEventListener("click", () => {
  searchInput.value = ""; activeCategory = "All";
  filters.querySelectorAll(".filter-chip").forEach(chip => chip.classList.toggle("active", chip.dataset.category === "All"));
  renderEvents();
});

const eventDialog = document.getElementById("eventDialog");
const registrationDialog = document.getElementById("registrationDialog");
const dialogContent = document.getElementById("dialogContent");
const eventSelect = document.getElementById("eventSelect");
eventSelect.innerHTML = events.map(e => `<option value="${e.id}">${e.title}</option>`).join("");

function openRegistration(eventId) {
  const event = events.find(e => e.id === eventId) || events[0];
  document.getElementById("selectedEventId").value = event.id;
  eventSelect.value = event.id;
  document.getElementById("selectedEventName").textContent = `Register for ${event.title} · ${formatDate(event.date)}`;
  document.getElementById("registrationForm").classList.remove("hidden");
  document.getElementById("successState").classList.add("hidden");
  clearErrors();
  if (eventDialog.open) eventDialog.close();
  registrationDialog.showModal();
}
eventGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-event]");
  if (!button) return;
  const item = events.find(e => e.id === button.dataset.event);
  dialogContent.innerHTML = `
    <div class="dialog-hero"><img src="${item.image}" alt="${item.title}"></div>
    <div class="dialog-body"><div class="eyebrow">${item.category.toUpperCase()} · GATHERLY PICKS</div>
      <h2 id="dialogTitle">${item.title}</h2><p>${item.longDescription}</p>
      <div class="dialog-meta"><span>◷ ${formatDate(item.date)} · ${item.time}</span><span>⌖ ${item.venue}</span><strong>${item.price}</strong></div>
      <button class="button button-primary" id="dialogRegister">Register for this event <span>↗</span></button></div>`;
  eventDialog.showModal();
  document.getElementById("dialogRegister").addEventListener("click", () => openRegistration(item.id));
});
document.getElementById("closeDialog").addEventListener("click", () => eventDialog.close());
document.getElementById("closeRegistration").addEventListener("click", () => registrationDialog.close());
[eventDialog, registrationDialog].forEach(dialog => dialog.addEventListener("click", e => {
  if (e.target === dialog) dialog.close();
}));
[ eventDialog, registrationDialog ].forEach(dialog => dialog.addEventListener("close", () => {
  if (!eventDialog.open && !registrationDialog.open) document.body.classList.remove("modal-open");
}));
[ eventDialog, registrationDialog ].forEach(dialog => dialog.addEventListener("cancel", () => document.body.classList.remove("modal-open")));
[ eventDialog, registrationDialog ].forEach(dialog => dialog.addEventListener("click", () => document.body.classList.add("modal-open")));

function clearErrors() {
  ["nameError","emailError","phoneError","eventError","consentError"].forEach(id => document.getElementById(id).textContent = "");
  document.querySelectorAll(".form-field input").forEach(input => input.classList.remove("invalid"));
}
function validateForm() {
  clearErrors();
  let valid = true;
  const name = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const consent = document.getElementById("consent");
  if (name.value.trim().length < 2 || !/^[A-Za-z][A-Za-z .'-]{1,}$/.test(name.value.trim())) {
    document.getElementById("nameError").textContent = "Please enter a valid name (at least 2 characters)."; name.classList.add("invalid"); valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
    document.getElementById("emailError").textContent = "Please enter a valid email address."; email.classList.add("invalid"); valid = false;
  }
  const digits = phone.value.replace(/\D/g,"");
  if (!/^[6-9]\d{9}$/.test(digits)) {
    document.getElementById("phoneError").textContent = "Enter a valid 10-digit Indian mobile number."; phone.classList.add("invalid"); valid = false;
  }
  if (!events.some(e => e.id === eventSelect.value)) {
    document.getElementById("eventError").textContent = "Please select an event."; valid = false;
  }
  if (!consent.checked) {
    document.getElementById("consentError").textContent = "Please accept the event update consent to continue."; valid = false;
  }
  return valid;
}
document.getElementById("registrationForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!validateForm()) return;
  const registration = {
    id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : `reg-${Date.now()}`,
    name: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.replace(/\D/g,""),
    eventId: eventSelect.value,
    eventName: events.find(item => item.id === eventSelect.value).title,
    registeredAt: new Date().toISOString()
  };
  try {
    const saved = JSON.parse(localStorage.getItem("gatherlyRegistrations") || "[]");
    saved.push(registration);
    localStorage.setItem("gatherlyRegistrations", JSON.stringify(saved));
  } catch (error) {
    document.getElementById("consentError").textContent = "Could not save registration in this browser. Please enable local storage and try again.";
    return;
  }
  document.getElementById("registrationForm").classList.add("hidden");
  document.getElementById("successMessage").textContent = `Thanks, ${registration.name}! Your registration for ${registration.eventName} has been saved in this browser.`;
  document.getElementById("successState").classList.remove("hidden");
});
document.getElementById("doneButton").addEventListener("click", () => registrationDialog.close());
eventSelect.addEventListener("change", () => {
  document.getElementById("selectedEventId").value = eventSelect.value;
  const selected = events.find(e => e.id === eventSelect.value);
  document.getElementById("selectedEventName").textContent = `Register for ${selected.title} · ${formatDate(selected.date)}`;
});
["fullName","email","phone"].forEach(id => document.getElementById(id).addEventListener("input", e => {
  e.target.classList.remove("invalid");
  const errorId = {fullName:"nameError",email:"emailError",phone:"phoneError"}[id];
  document.getElementById(errorId).textContent = "";
}));


// Countdown to the next upcoming event.
function updateCountdown() {
  const now = new Date();
  const nextEvent = events
    .map(item => ({ ...item, startsAt: new Date(`${item.date}T${item.time.startsWith("7:00 AM") ? "07:00" : item.time.startsWith("9:00 AM") ? "09:00" : item.time.startsWith("11:00 AM") ? "11:00" : item.time.startsWith("12:00 PM") ? "12:00" : item.time.startsWith("4:00 PM") ? "16:00" : item.time.startsWith("5:30 PM") ? "17:30" : "12:00"}:00`) }))
    .filter(item => item.startsAt > now)
    .sort((a, b) => a.startsAt - b.startsAt)[0];
  const value = document.getElementById("countdownValue");
  const label = document.getElementById("countdownLabel");
  if (!value || !label) return;
  if (!nextEvent) {
    value.textContent = "See you";
    label.textContent = "AT THE NEXT EVENT";
    return;
  }
  const distance = nextEvent.startsAt - now;
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  value.textContent = `${days}d ${hours}h`;
  label.textContent = `UNTIL ${nextEvent.title.toUpperCase().slice(0, 19)}`;
}
updateCountdown();
setInterval(updateCountdown, 60000);

// Theme preference is persisted between visits.
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeIcon.textContent = dark ? "☀" : "☾";
  localStorage.setItem("gatherlyTheme", dark ? "dark" : "light");
}
setTheme(localStorage.getItem("gatherlyTheme") === "dark");
themeToggle.addEventListener("click", () => setTheme(!document.body.classList.contains("dark")));

// Mobile navigation.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open"); menuToggle.setAttribute("aria-expanded","false");
}));

// Lightweight newsletter interaction (demo only; no email is sent to a server).
document.getElementById("newsletterForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("newsletterEmail");
  if (!email.checkValidity()) { email.reportValidity(); return; }
  document.getElementById("newsletterMessage").textContent = "You're on the list! (Demo confirmation)";
  email.value = "";
});
