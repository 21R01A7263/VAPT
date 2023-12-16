import { getParamsFromURL, saveOAuth2Info, logout } from "./utils.js";

let params = getParamsFromURL(window.location.href);

let ACCESS_TOKEN = "";
let redirect_url = "https://vapt.vercel.app/profile.html";
let button = document.getElementById("logout");
let form = document.getElementById("form");
let file = document.getElementById("files");

let search = document.getElementById("search");
let result = document.getElementById("result");

search.onclick = listFiles;
window.onload = (event) => {
  listFiles();
};
saveOAuth2Info(params, "profile.html", "info");
// saveOAuth2Info(params, "make_report.html", "info");
// saveOAuth2Info(params, "view_report.html", "info");

let info = JSON.parse(localStorage.getItem("info"));
ACCESS_TOKEN = info.access_token;
console.log(ACCESS_TOKEN);

form.onsubmit = uploadFile;

function uploadFile(e) {
  const filez = file.files[0];
  e.preventDefault();

  let metadata = {
    name: filez.name, // Filename at Google Drive
    mimeType: "application/pdf", // mimeType at Google Drive
    //parents: ["1_CgaBLdT6aytm-6f-_IRguycxPh_TGuo"], // Folder ID at Google Drive
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
  listFiles;
}

function listFiles() {
  searchFiles("", 5);
}

function searchFiles(q = "", pageSize) {
  result.innerHTML = "";
  fetch(
    `https://www.googleapis.com/drive/v3/files?q=${q}&pageSize=7&supportsAllDrives=true&fields=files(name,id,mimeType,webContentLink)`,
    {
      method: "GET",
      headers: new Headers({ Authorization: "Bearer " + ACCESS_TOKEN }),
    }
  )
    .then((res) => res.json())
    .then((info) => {
      console.log(info);
      info.files.forEach((file) => {
        let id = file.id;
        result.innerHTML += `
        
          <tr>
            <td>
            <p>${file.name}</p>
            </td>
            <td>${file.mimeType}</td>
            <td>
            <a target="_blank" href="https://drive.google.com/file/d/${file.id}">Download ${file.name}</a>
            </td>

            <td>
            <button class="delete" onclick="
              fetch('https://www.googleapis.com/drive/v3/files/${id}',{
              method:'DELETE',
              headers: new Headers({ Authorization: 'Bearer ${ACCESS_TOKEN}'})
            })
            .then((info) => {
              console.log(info)
              alert('file is deleted')
            })
            
            ">Delete ${file.name}</button>
          </td>
          
          </tr> 
        
        
        `;
      });
    });
}

button.onclick = logoutUser;

function logoutUser() {
  logout(ACCESS_TOKEN, redirect_url);
}

console.log(params);
