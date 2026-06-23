javascript id="d6ikyc"
/* ==========================
   LOADER
========================== */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }, 1800);
});

/* ==========================
   CUSTOM CURSOR
========================== */

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* ==========================
   PROGRESS BAR
========================== */

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
  const total =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    (window.scrollY / total) * 100;

  progressBar.style.width = progress + "%";
});

/* ==========================
   MOBILE NAVBAR
========================== */

const hamburger =
  document.querySelector(".hamburger");

const navLinks =
  document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* ==========================
   SMOOTH NAV LINKS
========================== */

document.querySelectorAll("a[href^='#']")
.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target =
      document.querySelector(
        this.getAttribute("href")
      );

    target.scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* ==========================
   GSAP
========================== */

gsap.registerPlugin(ScrollTrigger);

/* ==========================
   HERO ANIMATION
========================== */

gsap.from(".hero-badge", {
  y: 100,
  opacity: 0,
  duration: 1
});

gsap.from(".hero-title", {
  y: 100,
  opacity: 0,
  duration: 1,
  delay: .2
});

gsap.from(".hero-subtitle", {
  y: 100,
  opacity: 0,
  duration: 1,
  delay: .5
});

gsap.from(".hero-description", {
  y: 100,
  opacity: 0,
  duration: 1,
  delay: .8
});

gsap.from(".hero-buttons", {
  y: 100,
  opacity: 0,
  duration: 1,
  delay: 1
});

gsap.from(".social-icons", {
  y: 100,
  opacity: 0,
  duration: 1,
  delay: 1.2
});

gsap.from(".hero-image", {
  x: 150,
  opacity: 0,
  duration: 1.5,
  delay: .5
});

/* ==========================
   SECTION REVEAL
========================== */

gsap.utils
  .toArray(".section-title")
  .forEach((title) => {
    gsap.from(title, {
      y: 80,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: title,
        start: "top 80%"
      }
    });
  });

/* ==========================
   CARD REVEAL
========================== */

gsap.utils
  .toArray(
    ".about-card, .skill-card, .project-card, .article-card, .timeline-item, .stat-card"
  )
  .forEach((card) => {
    gsap.from(card, {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: card,
        start: "top 85%"
      }
    });
  });

/* ==========================
   STAGGER PROJECTS
========================== */

gsap.from(".project-card", {
  y: 100,
  opacity: 0,
  stagger: .2,
  duration: 1,
  scrollTrigger: {
    trigger: "#projects",
    start: "top 70%"
  }
});

/* ==========================
   PARALLAX HERO
========================== */

gsap.to(".profile-image", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    scrub: true
  }
});

/* ==========================
   ROTATE PROFILE RING
========================== */

gsap.to(".profile-ring", {
  rotation: 360,
  duration: 30,
  repeat: -1,
  ease: "linear"
});

/* ==========================
   MAGNETIC BUTTONS
========================== */

const buttons =
  document.querySelectorAll(".btn");

buttons.forEach((btn) => {

  btn.addEventListener("mousemove", (e) => {

    const rect =
      btn.getBoundingClientRect();

    const x =
      e.clientX -
      rect.left -
      rect.width / 2;

    const y =
      e.clientY -
      rect.top -
      rect.height / 2;

    gsap.to(btn, {
      x: x * .2,
      y: y * .2,
      duration: .3
    });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: .3
    });
  });
});

/* ==========================
   TILT PROJECT CARDS
========================== */

document
  .querySelectorAll(".project-card")
  .forEach((card) => {

    card.addEventListener(
      "mousemove",
      (e) => {

        const rect =
          card.getBoundingClientRect();

        const x =
          e.clientX - rect.left;

        const y =
          e.clientY - rect.top;

        const rotateY =
          (x / rect.width - .5) * 20;

        const rotateX =
          (y / rect.height - .5) * -20;

        card.style.transform =
          `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-10px)
          `;
      }
    );

    card.addEventListener(
      "mouseleave",
      () => {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0)";
      }
    );
  });

/* ==========================
   COUNTER ANIMATION
========================== */

const counters =
  document.querySelectorAll(".stat-card h2");

counters.forEach((counter) => {

  const target =
    parseInt(counter.innerText);

  if (isNaN(target)) return;

  let count = 0;

  const update = () => {

    count += target / 60;

    if (count < target) {
      counter.innerText =
        Math.ceil(count) + "+";

      requestAnimationFrame(update);
    } else {
      counter.innerText =
        target + "+";
    }
  };

  ScrollTrigger.create({
    trigger: counter,
    start: "top 80%",
    once: true,
    onEnter: update
  });
});

/* ==========================
   ACTIVE NAV LINK
========================== */

const sections =
  document.querySelectorAll("section");

const navItems =
  document.querySelectorAll(
    ".nav-links a"
  );

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {
    const top =
      section.offsetTop - 200;

    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("current");

    if (
      link.getAttribute("href") ===
      "#" + current
    ) {
      link.classList.add("current");
    }
  });
});

/* ==========================
   FLOATING PARTICLES
========================== */

for (let i = 0; i < 40; i++) {

  const particle =
    document.createElement("span");

  particle.classList.add("particle");

  particle.style.left =
    Math.random() * 100 + "%";

  particle.style.top =
    Math.random() * 100 + "%";

  particle.style.animationDuration =
    5 + Math.random() * 10 + "s";

  particle.style.animationDelay =
    Math.random() * 5 + "s";

  document.body.appendChild(particle);
}

/* ==========================
   SCROLL TO TOP BUTTON
========================== */

const topBtn =
  document.createElement("button");

topBtn.innerHTML =
  '<i class="fa-solid fa-arrow-up"></i>';

topBtn.classList.add("top-btn");

document.body.appendChild(topBtn);

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

window.addEventListener("scroll", () => {

  if (window.scrollY > 500) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

/* ==========================
   CONTACT FORM
========================== */

const form =
  document.querySelector(".contact-form");

form.addEventListener(
  "submit",
  (e) => {

    e.preventDefault();

    const btn =
      form.querySelector("button");

    btn.innerText =
      "Message Sent ✓";

    btn.style.background =
      "#10b981";

    setTimeout(() => {
      btn.innerText =
        "Send Message";

      btn.style.background =
        "";
    }, 3000);

    form.reset();
  }
);

/* ==========================
   TYPEWRITER EFFECT
========================== */

const subtitle =
  document.querySelector(
    ".hero-subtitle"
  );

const roles = [
  "Backend Engineer",
  "Cloud Developer",
  "Blockchain Engineer",
  "AI Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {

  const current =
    roles[roleIndex];

  if (!deleting) {

    subtitle.innerHTML =
      current.substring(
        0,
        charIndex++
      );

    if (
      charIndex >
      current.length
    ) {
      deleting = true;
      setTimeout(type, 1500);
      return;
    }
  } else {

    subtitle.innerHTML =
      current.substring(
        0,
        charIndex--
      );

    if (charIndex === 0) {
      deleting = false;
      roleIndex++;

      if (
        roleIndex >=
        roles.length
      ) {
        roleIndex = 0;
      }
    }
  }

  setTimeout(
    type,
    deleting ? 50 : 100
  );
}

type();

/* ==========================
   CONSOLE EASTER EGG
========================== */

console.log(
`
━━━━━━━━━━━━━━━━━━━━━━━━━━
Hi Recruiter 👋

Built by:
Srilekha Tatikonda

Backend Engineer
Cloud Developer
Blockchain Enthusiast

Github:
https://github.com/darkspywarrior
━━━━━━━━━━━━━━━━━━━━━━━━━━
`
);
