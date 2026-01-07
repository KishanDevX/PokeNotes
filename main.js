import {
  addFolder,
  changeUsername,
  deleteUserData,
  getUser,
} from "./utils/dataHandler.js";

const username = document.querySelector(".username");
const clearAllDataBtn = document.querySelector(".userIcon"); // temporary
const createFolBtn = document.querySelector(".addFolBtn");
const folderSpace = document.querySelector(".allFolders");

const user = getUser();
const allFols = user.folders;

// Change username
username.addEventListener("click", () => {
  const newName = prompt("Enter new username:", user.username);
  if (newName === "") {
    alert("invalid username!");
    return;
  }
  changeUsername(newName.trim());
  username.textContent = `${user.username}'s space`;

  console.log("clicked user rename: ", user);
});

// Clear all user data
clearAllDataBtn.addEventListener("click", () => {
  const confirmDelete = confirm(
    "Are you sure you want to delete all user data?"
  );
  if (confirmDelete) {
    deleteUserData();
    location.reload();
  }
});

// render folders
const renderFolders = (folList) => {
  folderSpace.innerHTML = "";
  if (folList.length === 0) {
    folderSpace.innerHTML =
      "<li class='notFoundMsg'>No folders yet. Create one!</li>";
    return;
  }
  folList.forEach((fol) => {
    folderSpace.innerHTML += `<li class="folder">${fol.folname}</li>`;
  });
};

// Create new folder
createFolBtn.addEventListener("click", () => {
  const askFolname = prompt("enter foldername: ");
  if (askFolname === "") {
    alert("invalid foldername!");
    return;
  }
  addFolder(askFolname.trim().toLowerCase());
  renderFolders(allFols);

  console.log("adding folder: ", user);
});

// go inside a folder
folderSpace.addEventListener("click", (e) => {
  const folderEl = e.target.closest(".folder");
  if (!folderEl) return;
  console.log(folderEl);
  const folname = folderEl.textContent.trim().toLowerCase();

  window.location.href = `./pages/folderView.html?folder=${encodeURIComponent(
    folname
  )}`;
});

// ================== INITIAL RENDER ==================
username.textContent = `${user.username}'s space`;
renderFolders(allFols);
