import { BaseNode } from "../components/BaseNode";

export const TextNode = ({ id, data }) => {
  const customFields = [
    { label: "Text", name: "text", type: "text", default: "{{input}}" },
  ];

  const inputHandles = [];
  const outputHandles = [{ id: `${id}-output` }];

  return (
    <BaseNode
      id={id}
      label="Text"
      data={data}
      customFields={customFields}
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    />
  );
};
