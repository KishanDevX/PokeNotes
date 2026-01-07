const STORAGE_KEY = "USR_FS_DATA";

const loadFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

const saveToStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usrData));
};

const defaultData = {
  username: "defaultUser",
  folders: [],
};

const storedData = loadFromStorage();

const usrData = storedData ?? defaultData;

// ---------------- USER ----------------

export const getUser = () => usrData;

export const changeUsername = (newName) => {
  usrData.username = newName;
  saveToStorage();
};

export const deleteUserData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// ---------------- FOLDERS ----------------
export const addFolder = (folname) => {
  if (usrData.folders.some((f) => f.folname === folname)) {
    console.error(`Folder "${folname}" already exists`);
    return;
  }

  usrData.folders.push({
    folname,
    files: [],
  });
  saveToStorage();
};

export const remFolder = (folname) => {
  if (!usrData.folders.some((f) => f.folname === folname)) {
    console.error(`Folder "${folname}" does not exist`);
    return;
  }

  usrData.folders = usrData.folders.filter((f) => f.folname !== folname);
  saveToStorage();
};

// ---------------- FILES ----------------
const getFolder = (folderName) => {
  return usrData.folders.find((f) => f.folname === folderName);
};

export const addFile = (fileName, folderName) => {
  const folder = getFolder(folderName);
  if (!folder) {
    console.error("Folder not found: " + folderName);
    return;
  }

  if (folder.files.some((f) => f.filename === fileName)) {
    console.error(`File "${fileName}" already exists`);
    return;
  }

  folder.files.push({
    filename: fileName,
    filecontent: "",
  });
  saveToStorage();
};

export const remFile = (fileName, folderName) => {
  const folder = getFolder(folderName);
  if (!folder) return;

  folder.files = folder.files.filter((f) => f.filename !== fileName);
  saveToStorage();
};

export const readFile = (fileName, folderName) => {
  const folder = getFolder(folderName);
  if (!folder) return null;

  const file = folder.files.find((f) => f.filename === fileName);

  return file ? file.filecontent : null;
};

export const writeFile = (fileName, folderName, content) => {
  const folder = getFolder(folderName);
  if (!folder) return;

  const file = folder.files.find((f) => f.filename === fileName);

  if (!file) {
    console.error("File not found");
    return;
  }

  file.filecontent = content;
  saveToStorage();
};
