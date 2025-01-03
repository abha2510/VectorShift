import { BaseNode } from "../components/BaseNode";

export const StringConcatenateNode = (props) => {
  const { id, data } = props;

  const customFields = [
    { label: "String 1", name: "string1", type: "text", default: "" },
    { label: "String 2", name: "string2", type: "text", default: "" },
  ];

  const inputHandles = [
    { id: `${id}-input1`, style: { top: "25%" } },
    { id: `${id}-input2`, style: { top: "50%" } },
  ];
  const outputHandles = [{ id: `${id}-output` }];

  return (
    <BaseNode
      id={id}
      label="String Concatenate"
      data={data}
      customFields={customFields}
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    />
  );
};
