import { BaseNode } from "../components/BaseNode";

export const NumberInputNode = (props) => {
  const { id, data } = props;

  const customFields = [
    { label: "Number", name: "inputNumber", type: "number", default: 0 },
  ];

  const inputHandles = [];
  const outputHandles = [{ id: `${id}-output` }];

  return (
    <BaseNode
      id={id}
      label="Number Input"
      data={data}
      customFields={customFields}
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    />
  );
};
