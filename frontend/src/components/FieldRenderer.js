import React from "react";
import { Checkbox } from "@nextui-org/checkbox";
import { Input, Select, SelectItem } from "@nextui-org/react";

const FieldRenderer = ({ field, value, onChange, label }) => {
  const handleInputChange = (e) => {
    onChange(field.name, e.target.value);
  };

  switch (field.type) {
    case "select":
      return (
        <Select
          placeholder="Text"
          defaultSelectedKeys={[field.options[0]]}
          variant="bordered"
          radius="full"
          label={label}
          onChange={handleInputChange}
        >
          {field.options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </Select>
      );

    case "text":
      return (
        <Input
          type="text"
          label={label}
          value={value}
          onChange={handleInputChange}
          variant="bordered"
          radius="full"
        />
      );

    case "number":
      return (
        <Input
          type="number"
          label={label}
          value={value}
          onChange={handleInputChange}
          variant="bordered"
          radius="full"
        />
      );

    case "checkbox":
      return (
        <Checkbox
          checked={value}
          onChange={(e) => onChange(field.name, e.target.checked)}
        >
          Option
        </Checkbox>
      );

    default:
      return (
        <Input
          type="text"
          label={label}
          value={value}
          onChange={handleInputChange}
          variant="bordered"
          radius="full"
        />
      ); // Fallback to text input
  }
};

export default FieldRenderer;
