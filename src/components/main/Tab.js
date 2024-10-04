export default function Tab({ activeTab, onChangeTab, children }) {
  const tabs = ["List", "Watched"];
  return (
    <>
      <div className="tabs">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => onChangeTab(index)}
          >
            {tab}
          </div>
        ))}
      </div>
      {children}
    </>
  );
}
