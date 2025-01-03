import { Handle, Position } from "reactflow";
import { useState, useEffect } from "react";
import FieldRenderer from "./FieldRenderer";

export const BaseNode = ({
  id,
  label,
  data = {},
  customFields = [],
  inputHandles = [],
  outputHandles = [],
  nodeStyle = {},
  handleStyle = {},
  children,
  className = null,
}) => {
  const [nodeData, setNodeData] = useState(data);

  // Ensure default values are set when the component mounts
  useEffect(() => {
    const defaultData = {};
    customFields.forEach((field) => {
      if (!nodeData[field.name]) {
        if (field.name.includes("Name")) {
          // Default naming logic for fields like 'inputName' or 'outputName'
          defaultData[field.name] = id.replace(
            `custom${label}-`,
            `${label.toLowerCase()}_`
          );
        } else {
          defaultData[field.name] = field.default || "";
        }
      }
    });
    setNodeData((prevData) => ({ ...prevData, ...defaultData }));
  }, [id, customFields]);

  const handleInputChange = (fieldName, value) => {
    setNodeData({
      ...nodeData,
      [fieldName]: value,
    });
  };

  return (
    <div
      style={{
        width: 200,
        padding: "10px",
        border: "1px solid black",
        height: 80,
        ...nodeStyle,
      }}
      className={className}
    >
      <div>
        <span>{label}</span>
      </div>
      {children && <div>{children}</div>}
      <div>
        {customFields?.map((field, index) => (
          <label key={index}>
            {field.label}:
            <FieldRenderer
              field={field}
              value={nodeData[field.name]}
              onChange={handleInputChange}
            />
          </label>
        ))}
      </div>
      {inputHandles?.map((handle, index) => (
        <Handle
          key={`${id}-input-${index}`}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={{ ...handleStyle, ...handle.style }}
        />
      ))}
      {outputHandles?.map((handle, index) => (
        <Handle
          key={`${id}-output-${index}`}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={{ ...handleStyle, ...handle.style }}
        />
      ))}
    </div>
  );
};
