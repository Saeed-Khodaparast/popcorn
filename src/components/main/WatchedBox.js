import { useState } from "react";

export default function WatchedBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box-watched">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "-" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}
