import { BaseNode } from "../components/BaseNode";

export const MultiplierNode = (props) => {
  const { id, data } = props;

  const customFields = [
    { label: "Multiplier 1", name: "multiplier1", type: "number", default: 1 },
    { label: "Multiplier 2", name: "multiplier2", type: "number", default: 1 },
  ];

  const inputHandles = [
    { id: `${id}-input1`, style: { top: "25%" } },
    { id: `${id}-input2`, style: { top: "50%" } },
  ];
  const outputHandles = [{ id: `${id}-output` }];

  return (
    <BaseNode
      id={id}
      label="Multiplier"
      data={data}
      customFields={customFields}
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    />
  );
};
