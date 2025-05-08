import React from "react";

const TextInput = ({ label, name, type = "text", icon: Icon, formik }) => {
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500">
            <Icon />
          </span>
        )}
        <input
          type={type}
          name={name}
          className={`w-full p-2 ${Icon ? "pl-10" : ""} border rounded ${
            error ? "border-red-500" : ""
          }`}
          {...formik.getFieldProps(name)}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default TextInput;
