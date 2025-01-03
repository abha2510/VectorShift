import { Textarea } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "");
  const [handles, setHandles] = useState([]);

  const defaultHandleStyle = {
    background: "#fff",
    width: "15px",
    height: "15px",
    border: "1px solid #000",
  };

  // Function to handle text changes
  const handleTextChange = (e) => {
    const text = e.target.value;
    setCurrText(text);
    updateHandlesForVariables(text);
  };

  // Function to extract variables from text and create handles
  const updateHandlesForVariables = (text) => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [...text.matchAll(regex)];

    // Create handles for unique variables found in the text
    const newHandles = matches.map((match, index) => ({
      id: `${id}-${match[1]}`,
      variable: match[1],
      style: { top: `${(index + 1) * 15}%` },
    }));

    setHandles(newHandles);
  };

  useEffect(() => {
    updateHandlesForVariables(currText);
  }, []);

  return (
    <div
      className={`px-5 py-4 w-80 border-2 bg-white flex flex-col gap-2 border-blue-600 shadow-lg rounded-lg `}
    >
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="bg-white w-3 h-3 rounded-full border-1 border-purple-500"
        style={defaultHandleStyle}
      />
      <div>
        <Textarea
          label="Prompt"
          placeholder="Enter text with variables like {{context}}"
          value={currText}
          onChange={handleTextChange}
          variant="bordered"
          radius="full"
          className="w-full h-full text-xl"
        />
      </div>

      {/* Dynamically render handles and variable labels for variables */}
      {handles.map((handle, index) => (
        <div
          key={handle.id}
          style={{ position: "absolute", left: 0, top: handle.style.top }}
        >
          <Handle
            type="target"
            position={Position.Left}
            id={handle.id}
            className="bg-white w-3 h-3 rounded-full border-1 border-purple-500"
            style={defaultHandleStyle}
          />
          <div
            style={{
              position: "relative",
              top: "10px",
              left: "-35px",
              fontSize: "12px",
              color: "gray",
              width: "100px",
            }}
          >
            {handle.variable}
          </div>
        </div>
      ))}
    </div>
  );
};
