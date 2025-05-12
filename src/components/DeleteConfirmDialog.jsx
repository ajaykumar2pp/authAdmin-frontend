import React from "react";

const DeleteConfirmDialog = ({ onClose, onConfirm }) => {
  return (
      <div className="bg-white p-12 w-full max-w-2xl mx-auto my-5 shadow-xl rounded-xl text-center z-50 backdrop-invert border-2 border-blue-700">
        <h2 className="text-2xl font-semibold text-red-600 mb-4 text-center">Delete Admin</h2>
        <p className="text-gray-700 mb-6 ">
          Are you sure you want to delete this admin?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto cursor-pointer font-semibold bg-gray-400 text-white px-5 py-2  hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-5 py-2 bg-red-500 text-white  hover:bg-red-700 transition font-semibold cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
  );
};

export default DeleteConfirmDialog;
