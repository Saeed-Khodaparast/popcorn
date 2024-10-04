import { useEffect, useRef } from "react";

export default function Search({ query, onSetQuery }) {
  const input = useRef(null);

  useEffect(() => {
    // console.log(input.current);
    input.current.focus();
    function callback(e) {
      if (document.activeElement === input.current) return;

      if (e.code === "Enter") {
        input.current.focus();
        onSetQuery("");
      }
    }
    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onSetQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={onSetQuery}
      ref={input}
    />
  );
}
