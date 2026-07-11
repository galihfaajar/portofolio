
// Typing Animation
const roles = ["Data Science Enthusiast", "Creative Multimedia", "Software Developer", "Video Editor", "Designer"];
let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed");

function typeEffect() {
  const currentRole = roles[roleIdx];
  if (isDeleting) {
    typedEl.textContent = currentRole.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = currentRole.substring(0, charIdx + 1);
    charIdx++;
  }

  let speed = isDeleting ? 50 : 100;
  if (!isDeleting && charIdx === currentRole.length) {
    speed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    speed = 500; // Pause before typing next
  }
  setTimeout(typeEffect, speed);
}

// Stats Counter Animation
const stats = document.querySelectorAll(".snum");
let counted = false;

function startCounter() {
  if (counted) return;
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute("data-count"));
    let count = 0;
    const speed = target / 50;
    const updateCount = () => {
      count += speed;
      if (count < target) {
        stat.textContent = Math.floor(count) + "+";
        setTimeout(updateCount, 20);
      } else {
        stat.textContent = target + "+";
      }
    };
    updateCount();
  });
  counted = true;
}

// Scroll Reveals & Stats trigger
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("active");
    }
  });

  // Check stats visibility
  const statsSec = document.getElementById("stats");
  if (statsSec) {
    const rect = statsSec.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      startCounter();
    }
  }
}

window.addEventListener("scroll", reveal);

// Navbar Scroll Effect & Scroll Progress & Back to Top
const navbar = document.getElementById("navbar");
const backTop = document.getElementById("back-top");
const progress = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
    backTop.classList.add("show");
  } else {
    navbar.classList.remove("scrolled");
    backTop.classList.remove("show");
  }

  // Scroll Progress
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progress.style.width = scrolled + "%";
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile Hamburger Menu
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-nav");
const mobileLinks = document.querySelectorAll("#mobile-nav a");

hamburger.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
  hamburger.classList.toggle("active");
});

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    hamburger.classList.remove("active");
  });
});

// Light/Dark Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  body.setAttribute("data-theme", newTheme);
  themeToggle.innerHTML = newTheme === "dark" ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// Project Showcase Render & Filter
const projGrid = document.getElementById("proj-grid");
const projFilter = document.getElementById("proj-filter");

function renderProjects(category = "Semua") {
  projGrid.innerHTML = "";
  const filtered = category === "Semua" ? projects : projects.filter(p => p.category === category);
  
  filtered.forEach(p => {
    const tagsHtml = p.tags.map(t => `<span>${t}</span>`).join("");
    const card = document.createElement("div");
    card.className = "proj-card reveal active";
    card.innerHTML = `
      <div class="pimg">
        <span class="pcat">${p.category}</span>
        ${p.thumbnail ? `<img src="${p.thumbnail}" alt="${p.title}" loading="lazy">` : `<div class="pimg-fallback">📁</div>`}
      </div>
      <div class="pbody">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="etags" style="margin-bottom:20px">${tagsHtml}</div>
        <div class="pbtn-wrap">
          ${p.links && p.links.demo ? `<a href="${p.links.demo}" class="btn-p prime" target="_blank">Lihat Project <i class="fas fa-external-link-alt"></i></a>` : ''}
          ${p.links && p.links.github ? `<a href="${p.links.github}" class="btn-p outline" target="_blank"><i class="fab fa-github"></i> GitHub</a>` : ''}
          ${p.links && p.links.instagram ? `<a href="${p.links.instagram}" class="btn-p prime" target="_blank"><i class="fab fa-instagram"></i> Lihat Instagram</a>` : ''}
        </div>
      </div>
    `;
    projGrid.appendChild(card);
  });
}

function initProjectFilters() {
  projFilter.innerHTML = "";
  projectCategories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `filter-btn ${cat === "Semua" ? "active" : ""}`;
    btn.textContent = cat;
    btn.addEventListener("click", (e) => {
      document.querySelectorAll("#proj-filter .filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(cat);
    });
    projFilter.appendChild(btn);
  });
}

// Video Portfolio Render & Filter
const vidGrid = document.getElementById("vid-grid");
const vidFilter = document.getElementById("vid-filter");

let currentVideoCategory = "Semua";
let currentVideoLimit = 3;

function renderVideos(category = "Semua", limit = 3) {
  vidGrid.innerHTML = "";
  const filtered = category === "Semua" ? videos : videos.filter(v => v.category === category);
  
  const toShow = limit > 0 ? filtered.slice(0, limit) : filtered;

  toShow.forEach(v => {
    const card = document.createElement("div");
    card.className = "vid-card reveal active";
    card.innerHTML = `
      <div class="vimg">
        ${v.thumbnail ? `<img src="${v.thumbnail}" alt="${v.title}" loading="lazy">` : `<div class="pimg-fallback">🎥</div>`}
        <div class="voverlay">
          <div class="vplay"><i class="fas fa-play"></i></div>
        </div>
        <span class="vdur">${v.duration}</span>
      </div>
      <div class="vbody">
        <span class="vcat-badge">${v.category}</span>
        <h4>${v.title}</h4>
        <a href="${v.instagramReelsUrl}" target="_blank" class="btn-v">
          <i class="fab fa-instagram"></i> Tonton di Instagram Reels
        </a>
      </div>
    `;
    vidGrid.appendChild(card);
  });

  const moreContainer = document.getElementById("vid-more-container");
  if (moreContainer) {
    if (limit > 0 && filtered.length > limit) {
      moreContainer.style.display = "block";
    } else {
      moreContainer.style.display = "none";
    }
  }
}

function initVideoFilters() {
  vidFilter.innerHTML = "";
  videoCategories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `filter-btn ${cat === "Semua" ? "active" : ""}`;
    btn.textContent = cat;
    btn.addEventListener("click", (e) => {
      document.querySelectorAll("#vid-filter .filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentVideoCategory = cat;
      currentVideoLimit = 3;
      renderVideos(currentVideoCategory, currentVideoLimit);
    });
    vidFilter.appendChild(btn);
  });

  const btnMoreVideos = document.getElementById("btn-more-videos");
  if (btnMoreVideos) {
    btnMoreVideos.addEventListener("click", () => {
      currentVideoLimit = 0; // 0 means show all
      renderVideos(currentVideoCategory, currentVideoLimit);
    });
  }
}

// Design Portfolio Masonry Render (Mock Designs)
const masonry = document.getElementById("masonry");
const designs = [
  { title: "Branding Design", cat: "Branding", ratio: "portrait" },
  { title: "Instagram Carousel", cat: "Carousel", ratio: "square" },
  { title: "Poster Event", cat: "Poster", ratio: "portrait" },
  { title: "UI Mockup", cat: "Mockup", ratio: "landscape" },
  { title: "Feed Instagram", cat: "Social Media", ratio: "square" },
  { title: "Poster Promosi", cat: "Poster", ratio: "portrait" }
];

function renderDesignShowcase() {
  masonry.innerHTML = "";
  designs.forEach(d => {
    const item = document.createElement("div");
    item.className = "masonry-item reveal active";
    
    // Custom height ratio
    let height = "300px";
    if(d.ratio === 'portrait') height = "400px";
    if(d.ratio === 'landscape') height = "200px";

    item.innerHTML = `
      <div style="height:${height}; width:100%; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg, #1e1b4b, #0f172a); font-size:40px;">🎨</div>
      <div class="m-overlay">
        <h4>${d.title}</h4>
        <span>${d.cat}</span>
      </div>
    `;
    
    // Add Click modal logic
    item.addEventListener("click", () => {
      openModal(d.title);
    });
    
    masonry.appendChild(item);
  });
}

// Modal System
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.querySelector(".modal-close");

function openModal(title) {
  modal.classList.add("open");
  // Set fallback image/canvas
  modalImg.src = "";
  modalImg.alt = title;
  modalImg.style.display = 'none';
  
  // Create a placeholder text inside modal if no image is available
  let text = document.getElementById("modal-text");
  if (!text) {
    text = document.createElement("h2");
    text.id = "modal-text";
    text.style.color = "white";
    text.style.textAlign = "center";
    modal.querySelector(".modal-inner").appendChild(text);
  }
  text.textContent = title + " - Full Preview Placeholder";
}

modalClose.addEventListener("click", () => {
  modal.classList.remove("open");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("open");
});

// Contact Form Handler
const form = document.getElementById("contact-form");
const formMsg = document.getElementById("form-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formMsg.style.color = "var(--text)";
  formMsg.textContent = "Sedang mengirim pesan...";
  
  const formData = new FormData(form);
  
  fetch("https://formsubmit.co/ajax/galihfjrr@gmail.com", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    formMsg.style.color = "#10B981";
    formMsg.textContent = "Pesan Anda berhasil terkirim! Terima kasih telah menghubungi.";
    form.reset();
  })
  .catch(error => {
    formMsg.style.color = "#EF4444";
    formMsg.textContent = "Terjadi kesalahan. Silakan coba lagi.";
  });
});

// Init
window.addEventListener("DOMContentLoaded", () => {
  typeEffect();
  initProjectFilters();
  renderProjects();
  initVideoFilters();
  renderVideos();
  renderDesignShowcase();
  setTimeout(reveal, 100);
});
