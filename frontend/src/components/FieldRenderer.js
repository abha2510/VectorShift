import React from 'react';

const FieldRenderer = ({ field, value, onChange }) => {
  const handleInputChange = (e) => {
    onChange(field.name, e.target.value);
  };

  switch (field.type) {
    case 'select':
      return (
        <select value={value} onChange={handleInputChange}>
          {field.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );

    case 'text':
      return <input type="text" value={value} onChange={handleInputChange} />;

    case 'number':
      return <input type="number" value={value} onChange={handleInputChange} />;

    case 'checkbox':
      return (
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(field.name, e.target.checked)}
        />
      );

    default:
      return <input type="text" value={value} onChange={handleInputChange} />; // Fallback to text input
  }
};

export default FieldRenderer;
