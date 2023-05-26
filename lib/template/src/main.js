
import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.less";

const root = ReactDom.createRoot(document.getElementById('app'))
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
  });
}
