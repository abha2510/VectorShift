import { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [handles, setHandles] = useState([]);

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
      style={{
        border: "1px solid black",
        padding: "10px",
        resize: "both",
        position: "relative",
        minHeight: "200px",
      }}
    >
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
      <div>
        <span>Text</span>
      </div>
      <div>
        <textarea
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with variables like {{context}}"
        />
      </div>

      {/* Dynamically render handles and variable labels for variables */}
      {handles.map((handle, index) => (
        <div
          key={handle.id}
          style={{ position: "absolute", left: 0, top: handle.style.top }}
        >
          <Handle type="target" position={Position.Left} id={handle.id} />
          <div
            style={{
              position: "relative",
              top: "10px",
              left: "-35px",
              fontSize: "12px",
              color: "gray",
            }}
          >
            {handle.variable}
          </div>
        </div>
      ))}
    </div>
  );
};
