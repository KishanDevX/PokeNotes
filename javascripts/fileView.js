import { getUser } from "../utils/dataHandler.js";

console.log("file view js loaded");
const params = new URLSearchParams(window.location.search);

const user = getUser();
const folder = params.get("folder");
const file = params.get("file");

const fileTitle = document.querySelector(".fileTitle");
const rawBtn = document.getElementById("rawBtn");
const parsedBtn = document.getElementById("parsedBtn");
const rawDisplay = document.getElementById("rawDisplay");
const parsedDisplay = document.getElementById("parsedDisplay");

// state
let currentView = "raw"; // default

function updateView(view) {
  currentView = view;

  if (view === "raw") {
    rawDisplay.hidden = false;
    parsedDisplay.hidden = true;

    rawBtn.classList.add("active");
    parsedBtn.classList.remove("active");
  } else {
    rawDisplay.hidden = true;
    parsedDisplay.hidden = false;

    parsedBtn.classList.add("active");
    rawBtn.classList.remove("active");
  }
}

// events
rawBtn.addEventListener("click", () => updateView("raw"));
parsedBtn.addEventListener("click", () => updateView("parsed"));

// initial setup
fileTitle.textContent = `${folder}/ ${file}`;
