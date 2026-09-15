/* =====================================================
   MAGGIE & PABLO — LOVE WEBSITE
===================================================== */


/* =====================================================
   PASSWORD
===================================================== */

function unlockLove() {

  const input = document.getElementById("passwordInput");
  const error = document.getElementById("passwordError");

  /*
    Password is Maggie + Pablo.
    Accepted formats:
    MaggiePablo
    PabloMaggie
    maggiepablo
    pab l... etc.
  */

  const entered = input.value
    .toLowerCase()
    .replace(/\s+/g, "");

  const passwords = [
    "maggiepablo",
    "pablomaggie"
  ];

  if (passwords.includes(entered)) {

    document.getElementById("lockScreen").style.opacity = "0";
    document.getElementById("lockScreen").style.transition = "opacity .6s";

    setTimeout(() => {

      document.getElementById("lockScreen").classList.add("hidden");
      document.getElementById("loveSite").classList.remove("hidden");

      startHeartRain();

    }, 600);

  } else {

    error.textContent =
      "Hmm... that's not our secret, Baby. Try again ❤️";

    input.value = "";

    input.style.border = "1px solid #ff7bc4";

    setTimeout(() => {
      input.style.border = "";
    }, 1200);

  }

}


/* Allow Enter key */

document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("passwordInput");

  input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
      unlockLove();
    }

  });

});


/* =====================================================
   PHOTO GALLERY
===================================================== */

const photoUpload = document.getElementById("photoUpload");
const galleryGrid = document.getElementById("galleryGrid");

let galleryImages = JSON.parse(
  localStorage.getItem("maggieGallery") || "[]"
);


/* Load existing images */

function loadGallery() {

  if (galleryImages.length === 0) {
    showEmptyGallery();
    return;
  }

  galleryGrid.innerHTML = "";

  galleryImages.forEach((image, index) => {

    const item = document.createElement("div");

    item.className = "gallery-item";

    item.innerHTML = `
      <img src="${image}">
      <button
        class="remove-photo"
        onclick="removePhoto(${index})"
        title="Remove photo"
      >
        ×
      </button>
    `;

    galleryGrid.appendChild(item);

  });

}


function showEmptyGallery() {

  galleryGrid.innerHTML = `
    <div class="empty-gallery">

      <div>📸</div>

      <h3>Our memories belong here.</h3>

      <p>
        Add your first photo above ❤️
      </p>

    </div>
  `;

}


/* Upload photos */

photoUpload.addEventListener("change", function(event) {

  const files = Array.from(event.target.files);

  files.forEach(file => {

    const reader = new FileReader();

    reader.onload = function(e) {

      galleryImages.push(e.target.result);

      localStorage.setItem(
        "maggieGallery",
        JSON.stringify(galleryImages)
      );

      loadGallery();

    };

    reader.readAsDataURL(file);

  });

});


/* Remove photo */

function removePhoto(index) {

  galleryImages.splice(index, 1);

  localStorage.setItem(
    "maggieGallery",
    JSON.stringify(galleryImages)
  );

  loadGallery();

}


/* Load gallery when page opens */

loadGallery();


/* =====================================================
   DATE PLANNER
===================================================== */

let dates = JSON.parse(
  localStorage.getItem("maggieDates") || "[]"
);


function addDate() {

  const name = document.getElementById("dateName").value.trim();
  const day = document.getElementById("dateDay").value;
  const time = document.getElementById("dateTime").value;
  const place = document.getElementById("datePlace").value.trim();
  const note = document.getElementById("dateNote").value.trim();

  if (!name || !day) {

    alert("Give our date a name and a date, Baby ❤️");

    return;

  }

  const newDate = {

    id: Date.now(),

    name: name,

    day: day,

    time: time,

    place: place,

    note: note

  };


  dates.push(newDate);

  /* Sort dates chronologically */

  dates.sort(
    (a, b) => new Date(a.day) - new Date(b.day)
  );

  localStorage.setItem(
    "maggieDates",
    JSON.stringify(dates)
  );


  /* Clear fields */

  document.getElementById("dateName").value = "";
  document.getElementById("dateDay").value = "";
  document.getElementById("dateTime").value = "";
  document.getElementById("datePlace").value = "";
  document.getElementById("dateNote").value = "";


  renderDates();

}


function renderDates() {

  const container = document.getElementById("dateList");

  if (dates.length === 0) {

    container.innerHTML = `

      <div class="no-dates">

        <div>🌷</div>

        <h3>No dates planned yet.</h3>

        <p>
          Let's change that, Baby.
        </p>

      </div>

    `;

    return;

  }


  container.innerHTML = "";


  dates.forEach(date => {

    const dateObj = new Date(date.day + "T00:00:00");

    const dayNumber = dateObj.getDate();

    const month = dateObj.toLocaleString(
      "en-US",
      { month: "short" }
    );

    const formattedDate = dateObj.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );


    const item = document.createElement("div");

    item.className = "date-item";

    item.innerHTML = `

      <div class="date-number">

        <strong>${dayNumber}</strong>

        <span>${month}</span>

      </div>


      <div class="date-details">

        <h3>${escapeHTML(date.name)}</h3>

        <p>
          📅 ${formattedDate}
          ${date.time ? ` · ⏰ ${escapeHTML(date.time)}` : ""}
        </p>

        ${
          date.place
          ? `<p>📍 ${escapeHTML(date.place)}</p>`
          : ""
        }

        ${
          date.note
          ? `<p class="date-note">
              "${escapeHTML(date.note)}"
             </p>`
          : ""
        }

      </div>


      <button
        class="delete-date"
        onclick="deleteDate(${date.id})"
      >
        ×
      </button>

    `;

    container.appendChild(item);

  });

}


/* Delete date */

function deleteDate(id) {

  dates = dates.filter(date => date.id !== id);

  localStorage.setItem(
    "maggieDates",
    JSON.stringify(dates)
  );

  renderDates();

}


/* Protect HTML inserted into date cards */

function escapeHTML(value) {

  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


renderDates();


/* =====================================================
   LOVE SURPRISE
===================================================== */

function showLove() {

  document
    .getElementById("loveModal")
    .classList.add("active");

  heartExplosion();

}


function closeLove() {

  document
    .getElementById("loveModal")
    .classList.remove("active");

}


/* Close modal by clicking outside */

document
  .getElementById("loveModal")
  .addEventListener("click", function(event) {

    if (event.target === this) {
      closeLove();
    }

  });


/* =====================================================
   HEART RAIN
===================================================== */

function startHeartRain() {

  const symbols = [
    "♡",
    "♥",
    "💜",
    "🌸",
    "🌷",
    "✿"
  ];

  setInterval(() => {

    const heart = document.createElement("div");

    heart.innerHTML =
      symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-30px";
    heart.style.fontSize =
      (12 + Math.random() * 18) + "px";

    heart.style.color = "#dfa0ff";
    heart.style.opacity = ".5";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "1";

    document.body.appendChild(heart);


    const duration =
      5000 + Math.random() * 5000;


    heart.animate(

      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: .5
        },

        {
          transform:
            `translateY(110vh) rotate(${360 + Math.random() * 360}deg)`,
          opacity: 0
        }

      ],

      {
        duration: duration,
        easing: "linear"
      }

    ).onfinish = () => heart.remove();

  }, 900);

}


/* =====================================================
   HEART EXPLOSION
===================================================== */

function heartExplosion() {

  const symbols = [
    "♥",
    "♡",
    "💜",
    "💖",
    "🌸"
  ];


  for (let i = 0; i < 35; i++) {

    const heart = document.createElement("div");

    heart.innerHTML =
      symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.position = "fixed";

    heart.style.left = "50%";
    heart.style.top = "50%";

    heart.style.fontSize =
      (14 + Math.random() * 20) + "px";

    heart.style.color = "#e19cff";

    heart.style.pointerEvents = "none";

    heart.style.zIndex = "9999";


    document.body.appendChild(heart);


    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      100 + Math.random() * 300;

    const x =
      Math.cos(angle) * distance;

    const y =
      Math.sin(angle) * distance;


    heart.animate(

      [
        {
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 1
        },

        {
          transform:
            `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.3)`,
          opacity: 0
        }

      ],

      {
        duration: 1000 + Math.random() * 600,
        easing: "cubic-bezier(.2,.8,.2,1)"
      }

    ).onfinish = () => heart.remove();

  }

}


/* =====================================================
   EASTER EGG
===================================================== */

let logoClicks = 0;

document
  .querySelector(".logo")
  .addEventListener("click", function() {

    logoClicks++;

    if (logoClicks >= 5) {

      logoClicks = 0;

      alert(
        "Maggie + Pablo = my favorite love story. 💜"
      );

    }

  });