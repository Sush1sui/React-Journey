import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./index.css";
import React from "react";
// import StarRating from "./components/StarRating";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
        {/* <StarRating maxRating={5} />
        <StarRating maxRating={5} size={24} color="red" /> */}
    </StrictMode>
);
