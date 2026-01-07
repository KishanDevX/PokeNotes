import { addFile, getUser } from "../utils/dataHandler.js";

const params = new URLSearchParams(window.location.search);
const folder = params.get("folder");

const user = getUser();

const folderTitle = document.querySelector(".folderTitle");
const createFilBtn = document.querySelector(".addFilBtn");
const fileSpace = document.querySelector(".allFiles");

const requiredFolder = user.folders.find((f) => f.folname === folder);

// render files
const renderFiles = (filList) => {
  fileSpace.innerHTML = "";
  if (filList.length === 0) {
    fileSpace.innerHTML =
      "<li class='notFoundMsg'>No files yet. Create one!</li>";
    return;
  }
  filList.forEach((fil) => {
    fileSpace.innerHTML += `<li class="file">${fil.filename}</li>`;
  });
};

// Create new file
createFilBtn.addEventListener("click", () => {
  const askFilname = prompt("enter filename");
  if (askFilname === "") {
    alert("invalid filename!");
    return;
  }
  addFile(askFilname.trim().toLowerCase(), folder);
  renderFiles(requiredFolder.files);
  console.log("adding file: ", user);
});

// go inside a file
fileSpace.addEventListener("click", (e) => {
  const fileEl = e.target.closest(".file");
  if (!fileEl) return;

  const filename = fileEl.innerText.trim().toLowerCase();

  const params = new URLSearchParams({
    folder,
    file: filename,
  });

  window.location.href = `../pages/fileView.html?${params.toString()}`;
});

// ================== INITIAL RENDER ==================
folderTitle.textContent = `inside ${folder}`;
renderFiles(requiredFolder.files);
