import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import {redirectToAuthCodeFlow, getAccessToken, fetchProfile, populateUI} from "./connectScript";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
)
setTimeout(async () => {
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
const clientId = "493150b38c7c4589964753de71967bda";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
const profileString = localStorage.getItem('currentProfile');
let profile = null;

if (profileString) {
    profile = JSON.parse(profileString);
    populateUI(profile);
} else {
    if (!code) {
        redirectToAuthCodeFlow(clientId);
    } else {
        const accessToken = await getAccessToken(clientId, code);
        const profile = await fetchProfile(accessToken);
        populateUI(profile);
    }
}

}, 800);
