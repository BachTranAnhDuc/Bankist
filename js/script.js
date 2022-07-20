"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const header = document.querySelector(".header");
const allButtons = document.getElementsByTagName("button");
const allSections = document.querySelectorAll(".section");

// const message = document.createElement("div");
// const btnCloseCookie = document.querySelector(".btn--close-cookie");
// const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const h1 = document.querySelector("h1");
const nav = document.querySelector(".nav");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////////////

// message.classList.add("cookie-message");

// message.innerHTML = `We use cookied for improved function ality and analytics. <button class="btn btn--close-cookie">Got it</button>`;
// header.prepend(message);

// btnCloseCookie.addEventListener("click", function (e) {
//   e.preventDefault();
//   message.parentElement.removeChild(message);
// });

// message.style.padding = "0 1.2rem";
// message.style.marginTop = "1.2rem";

// // Scroll

// btnScrollTo.addEventListener("click", function (e) {
//   const s1coords = section1.getBoundingClientRect();

//   section1.scrollIntoView({
//     behavior: "smooth",
//   });
// });

/// Handle event

// const al = function () {
//   alert("Thank you for comming");
// };

// h1.addEventListener("mouseenter", function (e) {
//   al();
// });

// setTimeout(
//   () =>
//     h1.removeEventListener("mouseenter", function (e) {
//       al();
//     }),
//   3000
// );

// 1. Add event listener to commom parent element.
// 2. Determine what element orginated the event
// [...document.querySelectorAll(".nav__link")].forEach((nav) => {
//   nav.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//   });
// });

// [...document.querySelectorAll(".nav__link")].forEach((nav) => {
//   console.log(nav);
// });

// console.log("....");

// document.querySelectorAll(".nav__link").forEach((nav) => {
//   nav.addEventListener("click", function (e) {
//     e.preventDefault();

//     const id = nav.getAttribute("href");

//     // console.log(id);
//     // console.log(typeof id);

//     document.querySelector(`#${id}`).scrollIntoView({
//       behavior: "smooth",
//     });

//     // document.getElementById(id).scrollIntoView({
//     //   behavior: "smooth",
//     // });
//   });
// });

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");

    console.log(id);

    document.querySelector(`#${id}`).scrollIntoView({
      behavior: "smooth",
    });
  }

  // console.log(e.target.getAttribute("href"));
});

// going downwards: child

// console.log(h1.closest(".header"));

// [...h1.parentElement.children].forEach((el) => {
//   if (el !== h1) {
//     console.log(el);
//     el.style.transform = "scale(0.5)";
//   }
// });

// Operations

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Guard clause
  if (!clicked) return;

  // hide button active
  [...tabs].forEach((el) => {
    el.classList.remove("operations__tab--action");
  });

  // hide content active
  [...tabsContent].forEach((el) => {
    el.classList.remove("operations__content--active");
  });

  // active button
  clicked.classList.add("operations__tab--action");

  // active content
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    // console.log(e.target);
    const link = e.target;
    const siblings = link.closest("nav").querySelectorAll(".nav__link");
    const logo = link.closest("nav").querySelector(".nav__logo");
    // const siblings = nav.querySelectorAll(".nav__link");

    siblings.forEach((el) => {
      if (link !== el) {
        el.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener("scroll", function (e) {
//   if (this.window.scrollY > initialCoords.top) {
//     // console.log(this.window.scrollY, initialCoords.top);
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

// Sticky navigation: Intersection Observer API
// const headerObserver;

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, obsOptions);

headerObserver.observe(header);

// Reveal Sections
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const revealOptions = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(revealSection, revealOptions);

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
