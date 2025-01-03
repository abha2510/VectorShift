import { BaseNode } from "../components/BaseNode";

export const OutputNode = (props) => {
  const { id, data } = props;

  const customFields = [
    {
      label: "Name",
      name: "outputName",
      type: "text",
      default: id.replace("customOutput-", "output_"),
    },
    {
      label: "Type",
      name: "outputType",
      type: "select",
      options: ["Text", "Image"],
      default: "Text",
    },
  ];

  const inputHandles = [{ id: `${id}-value` }];
  const outputHandles = [];

  return (
    <BaseNode
      id={id}
      label="Output"
      data={data}
      customFields={customFields}
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    />
  );
};
