import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import TextInput from "../../components/TextInput";
import { tokenSchema } from "../../validations/tokenSchema";
import { login2FA } from "../../api/authAPI";
import { toast } from "react-toastify";

const TwoFALogin = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state?.email) {
    toast.error("No email found. Redirecting...");
    navigate("/login");
    return null;
  }

  const formik = useFormik({
    initialValues: {
      token: "",
    },
    validationSchema: tokenSchema,
    onSubmit: async ({ token }) => {
      try {
        const response = await login2FA({
          email: state.email,
          password: state.password,
          token,
        });
        toast.success(response.data.message || "Registration successful!");
        // console.log("User Respone", response);
        // Form reset karo
        resetForm();

        // Navigate to login page
        navigate("/dashboard");
      } catch (error) {
        const msg = err.response?.data?.message || "Invalid token";
        toast.error(msg);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-[500px] py-3 px-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          2FA Verification
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <TextInput
            label="Enter 2FA Code"
            name="token"
            type="text"
            icon={""}
            formik={formik}
          />
          <button onClick={handleVerify}>Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default TwoFALogin;
