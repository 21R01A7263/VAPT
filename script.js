import { signIn } from "./utils.js";

let CLIENT_ID ="864591496189-f8fqrsai6d9td034r3nfs1vcg0e0fiff.apps.googleusercontent.com";
let REDIRECT_URI = "http://127.0.0.1:5501/profile.html";
let SCOPES = "https://www.googleapis.com/auth/drive";

let button = document.getElementById("signin");

button.onclick = sign;

export default function sign() {
  signIn(CLIENT_ID, REDIRECT_URI, SCOPES);
}
