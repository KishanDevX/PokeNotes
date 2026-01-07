import { getUser, writeFile } from "../utils/dataHandler.js";

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

const fileInput = document.getElementById("fileInput");

// state
let currentView = "raw"; // default
const requiredFolder = user.folders.find((f) => f.folname === folder);
const requiredFile = requiredFolder.files.find((fi) => fi.filename === file);

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

// mode events
rawBtn.addEventListener("click", () => updateView("raw"));
parsedBtn.addEventListener("click", () => updateView("parsed"));

// keep saving on input
let saveTimer;
fileInput.addEventListener("input", () => {
  clearTimeout(saveTimer);

  saveTimer = setTimeout(() => {
    writeFile(file, folder, fileInput.value);
  }, 400); // 300–600ms is ideal
});

// initial setup
fileTitle.textContent = `${folder}/ ${file}`;
fileInput.value = requiredFile.filecontent;

parsedDisplay.innerHTML = marked.parse(requiredFile.filecontent);
