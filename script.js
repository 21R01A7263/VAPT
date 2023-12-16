import { signIn } from "./utils.js";

let CLIENT_ID ="508774011704-rv5jvasfam9rkp7angkn3fbs6u62vi1e.apps.googleusercontent.com";
let REDIRECT_URI = "https://vapt.vercel.app/profile.html";
let SCOPES = "https://www.googleapis.com/auth/drive";

let button = document.getElementById("signin");

button.onclick = sign;

export default function sign() {
  signIn(CLIENT_ID, REDIRECT_URI, SCOPES);
}
