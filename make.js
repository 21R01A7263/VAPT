import { getParamsFromURL } from "./utils.js";

document.getElementById("uploadbtn").addEventListener("click", function () {
  document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener("change", function () {
  const fileNameDisplay = document.getElementById("fileNameDisplay");
  if (this.files.length > 0) {
    fileNameDisplay.textContent = this.files[0].name;
  } else {
    fileNameDisplay.textContent = "";
  }
  setTimeout(uploadFile, 2000);
});

let params = getParamsFromURL(window.location.href);

let ACCESS_TOKEN = "";

let form = document.getElementById("form");
let file = document.getElementById("fileInput");
let toastBtn = document.getElementById("showTost");

let info = JSON.parse(localStorage.getItem("info"));
ACCESS_TOKEN = info.access_token;

function showTost1() {
  Toastify({
    text: "File uploaded successfully!",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    backgroundColor: "green",
  }).showToast();
}

function uploadFile(e) {
  const filez = file.files[0];

  let metadata = {
    name: filez.name,
    mimeType: "application/pdf",
  };

  let form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("file", file.files[0]);

  fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
    {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer " + ACCESS_TOKEN }),
      body: form,
    }
  )
    .then((res) => res.json())
    .then((info) => {
      console.log(info);
      file.value = "";
    });
  toastBtn.click();
}
