import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ label, name, formik }) => {
  const [showPassword, setShowPassword] = useState(false);
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500">
          <FaLock />
        </span>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          className={`w-full p-2 pl-10 pr-10 border rounded ${
            error ? "border-red-500" : ""
          }`}
          {...formik.getFieldProps(name)}
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default PasswordInput;
