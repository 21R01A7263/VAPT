import { getParamsFromURL } from "./utils.js";

let params = getParamsFromURL(window.location.href);

let ACCESS_TOKEN = "";
let redirect_url = "http://127.0.0.1:5500/profile.html";
let button = document.getElementById("logout");
let form = document.getElementById("form");
let file = document.getElementById("files");

let search = document.getElementById("search");
let result = document.getElementById("result");

let info = JSON.parse(localStorage.getItem("info"));
ACCESS_TOKEN = info.access_token;
console.log(ACCESS_TOKEN);

window.onload = (event) => {
  listFiles();
};

function listFiles() {
  searchFiles("", 5);
}
function showTost1() {
  Toastify({
    text: "Report Deleted Successfully!",
    duration: 3000,
    gravity: "bottom", // Display at the bottom
    position: "right", // Display at the right
    backgroundColor: "red",
    className: "toastify", // Apply custom class
  }).showToast();
}
function searchFiles(q = "", pageSize) {
  result.innerHTML = "";
  var currentDate = new Date();
  var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  
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
              <p id="filename">${file.name}</p>
              </td>
              <td>${currentDate.toLocaleDateString(undefined, options)}</td>
              <td>
              <a target="_blank" href="https://drive.google.com/file/d/${file.id}"><button id="download">Download</button></a>
              </td>
  
              <td>
              <button id="delete" onclick="
                fetch('https://www.googleapis.com/drive/v3/files/${id}',{
                method:'DELETE',
                headers: new Headers({ Authorization: 'Bearer ${ACCESS_TOKEN}'})
              })
              .then((info) => {
                console.log(info)
                showTost1();
              })
              
              ">Delete</button>
            </td>
            
            </tr> 
          
          
          `;
      });
    });
}
