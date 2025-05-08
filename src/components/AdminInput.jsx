import React from "react";

const TextInput = ({ label, name, type = "text", formik }) => {
  const error = formik.touched[name] && formik.errors[name];
  const isPhoneNumber = label === "Phone Number";

  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        {/* Label */}
        <label className="text-sm font-medium sm:w-1/4 mb-1 sm:mb-0">
          {label} {!isPhoneNumber && <span className="text-red-500">*</span>}
        </label>

        {/* Input and Error */}
        <div className="sm:w-3/4 w-full">
          <input
            type={type}
            name={name}
            className={`w-full p-2 border rounded shadow-sm  ${
              error ? "border-red-500" : ""
            }`}
            {...formik.getFieldProps(name)}
          />
          {error && (
            <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextInput;
