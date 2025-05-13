import React from "react";

const DeleteConfirmDialog = ({ onClose, onConfirm }) => {
  return (
    <div className="bg-neutral-50 p-10 w-full max-w-2xl mx-auto my-10 shadow-2xl rounded-2xl text-center border-2 border-neutral-700 backdrop-invert">
      <h2 className="text-3xl font-bold text-red-600 mb-4 tracking-wide">
        ⚠️ Delete Admin
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Are you sure you want to{" "}
        <span className="font-semibold text-red-500">permanently delete</span>{" "}
        this admin?
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-5 py-2 bg-gray-200 text-gray-800 font-medium  hover:bg-gray-300 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="w-full sm:w-auto px-5 py-2 bg-red-600 text-white font-semibold  hover:bg-red-700 transition cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;
