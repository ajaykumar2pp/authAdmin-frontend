import React, {useEffect} from "react";
import { useFormik } from "formik";
import TextInput from "./AdminInput";
import { adminSchema } from "../validations/adminSchema";
import { postAdmin, updateAdmin } from "../api/adminAPI";
import { toast } from "react-toastify";

const AdminForm = ({ onClose, onAdd, editData }) => {
  const isEdit = Boolean(editData);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: adminSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // console.log("Form submitted with values:", values);
        if (isEdit) {
          await updateAdmin(editData._id, values);
          toast.success("Admin updated successfully!");
        } else {
          await postAdmin(values);
          toast.success("Admin added successfully!");
        }
        resetForm();
        onAdd();
        onClose();
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        console.error(error);
      }
    },
  });

  // Fill form fields in edit mode
  useEffect(() => {
    if (isEdit) {
      formik.setValues({
        name: editData.name || "",
        email: editData.email || "",
        phone: editData.phone || "",
        address: editData.address || "",
      });
    }
  }, [editData]);

  return (
    <div className="bg-white p-6 w-full max-w-4xl mx-auto my-5 shadow-md">
      <h3 className="text-xl text-yellow-500 font-bold mb-4 text-center">
       {isEdit ? "Edit Admin" : "Add New Admin"} 
      </h3>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <TextInput label="Name" name="name" formik={formik} />
        <TextInput label="Email" name="email" type="email" formik={formik} />
        <TextInput
          label="Phone Number"
          name="phone"
          type="text"
          formik={formik}
        />
        <TextInput label="Address" name="address" formik={formik} />

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
          <button
            type="submit"
            className={`w-full sm:w-auto text-white px-5  py-2 font-semibold  transition flex items-center justify-center gap-2 ${
              formik.isSubmitting || !formik.isValid
                ? "bg-yellow-500 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
            }`}
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
              {isEdit ? "Update Admin" : "Add Admin"}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto cursor-pointer font-semibold bg-gray-700 text-white px-5 py-2  hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
