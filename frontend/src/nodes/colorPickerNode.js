import { BaseNode } from "../components/BaseNode";

export const ColorPickerNode = (props) => {
  const { id, data } = props;

  const customFields = [
    {
      label: "Pick a color",
      name: "selectedColor",
      type: "text",
      default: "#000000",
    },
  ];

  const inputHandles = [];
  const outputHandles = [{ id: `${id}-output` }];

  return (
    <BaseNode
      id={id}
      label="Color Picker"
      data={data}
      customFields={customFields}
      inputHandles={inputHandles}
      outputHandles={outputHandles}
      children={
        <div>
          <input
            type="color"
            value={data?.selectedColor || "#000000"}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
      }
    />
  );
};
