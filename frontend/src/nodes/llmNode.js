import { BaseNode } from "../components/BaseNode";

export const LLMNode = (props) => {
  const { id, data } = props;

  const inputHandles = [
    { id: `${id}-system`, style: { top: `${100 / 3}%` } },
    { id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
  ];

  const outputHandles = [{ id: `${id}-response` }];

  return (
    <BaseNode
      id={id}
      label="LLM"
      data={data}
      inputHandles={inputHandles}
      outputHandles={outputHandles}
      children={<span>This is a LLM.</span>}
    />
  );
};
