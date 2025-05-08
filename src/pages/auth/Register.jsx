import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { registerSchema } from "../../validations/registerSchema";
import TextInput from "../../components/TextInput";
import PasswordInput from "../../components/PasswordInput";
import { toast } from "react-toastify";
import { registerUser } from "../../api/authAPI";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await registerUser(values);
        toast.success(response.data.message || "Registration successful!");
        console.log("User Respone", response);
        // Form reset karo
        resetForm();

        // Navigate to login page
        navigate("/login");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong!";
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-[500px] py-3 px-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <TextInput label="Name" name="name" icon={FaUser} formik={formik} />

          <TextInput
            label="Email"
            name="email"
            type="email"
            icon={FaEnvelope}
            formik={formik}
          />

          <PasswordInput label="Password" name="password" formik={formik} />

          <button
            type="submit"
            className={`w-full text-white font-bold py-2 rounded transition flex items-center justify-center gap-2 ${
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
                Registering...
              </>
            ) : (
              "REGISTER"
            )}
          </button>
        </form>

        <div className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link to={"/login"} className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
