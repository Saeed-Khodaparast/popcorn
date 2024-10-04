import { useState } from "react";

export default function ListBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box-list">
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
