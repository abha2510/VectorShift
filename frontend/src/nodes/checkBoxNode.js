import { BaseNode } from "../components/BaseNode";

export const CheckboxNode = (props) => {
  const { id, data } = props;

  const customFields = [
    { label: "Checked?", name: "isChecked", type: "checkbox", default: false },
  ];

  const inputHandles = [];
  const outputHandles = [{ id: `${id}-output` }];

  return (
    <BaseNode
      id={id}
      label="Checkbox Node"
      data={data}
      customFields={customFields}
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    />
  );
};
