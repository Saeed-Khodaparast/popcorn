import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./components/main/StarRating";

function TestRating() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color="yellow" maxRating={10} onSetRating={setMovieRating} />
      <p>This movies was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <TestRating /> */}
  </React.StrictMode>
);
