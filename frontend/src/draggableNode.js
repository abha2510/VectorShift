// draggableNode.js

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`text-gray-600 border-2 border-gray-300 rounded-lg min-w-24 min-h-24 gap-1 cursor-grab bg-white ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "10px",
        flexWrap: "wrap",
      }}
      draggable
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-base">{label}</span>
    </div>
  );
};
