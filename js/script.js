"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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

const header = document.querySelector(".header");
const allButtons = document.getElementsByTagName("button");

const message = document.createElement("div");

message.classList.add("cookie-message");

message.innerHTML = `We use cookied for improved function ality and analytics. <button class="btn btn--close-cookie">Got it</button>`;
header.prepend(message);

const btnCloseCookie = document.querySelector(".btn--close-cookie");
btnCloseCookie.addEventListener("click", function (e) {
  e.preventDefault();
  message.parentElement.removeChild(message);
});

message.style.padding = "0 1.2rem";
message.style.marginTop = "1.2rem";

// Scroll

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();

  section1.scrollIntoView({
    behavior: "smooth",
  });
});

/// Handle event
const h1 = document.querySelector("h1");

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
