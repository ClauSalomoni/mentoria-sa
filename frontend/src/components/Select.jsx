import React from 'react';

export default function Select({ label, value, onChange, options = [], required }) {
  return (
    <div className="profile-input-wrapper">
      {label && <label className="profile-field-label">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="profile-select-field"
      >
        <option value="" disabled style={{ background: "#0f1015", color: "#9ca3af" }}>
          Selecione uma opção...
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} style={{ background: "#0f1015", color: "#fff" }}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}