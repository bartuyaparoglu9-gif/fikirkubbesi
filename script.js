const loader = document.getElementById("loader");
const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hidden"), 450);
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
});

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();


const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav a[href^='#']")];

const setActiveLink = () => {
  const offset = window.scrollY + 180;
  let currentId = "anasayfa";

  for (const section of sections) {
    if (offset >= section.offsetTop) {
      currentId = section.id;
    }
  }

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
};

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("load", setActiveLink);


const hero = document.querySelector(".hero");
window.addEventListener("mousemove", (event) => {
  if (!hero || window.innerWidth < 900) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 10;
  const y = (event.clientY / window.innerHeight - 0.5) * 8;
  hero.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
});
