import { getParamsFromURL, saveOAuth2Info, logout} from "./utils.js";


let button = document.getElementById("signin");

button.onclick = logoutUser;

function logoutUser() {
  logout(ACCESS_TOKEN, redirect_url);
}
let params = getParamsFromURL(window.location.href);
window.onload = (event) => {
  saveOAuth2Info(params, "profile.html", "info");
};
