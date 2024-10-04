export default function Logo() {
  return (
    <div className="logo">
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt="Description"
        width="32px"
      />
      {/* <span role="img">🍿</span> */}
      <h1>Popcorn</h1>
    </div>
  );
}
