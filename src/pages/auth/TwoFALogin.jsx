import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import TextInput from "../../components/TextInput";
import { tokenSchema } from "../../validations/tokenSchema";
import { verify2FA } from "../../api/authAPI";
import { toast } from "react-toastify";

const TwoFALogin = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      token: "",
    },
    validationSchema: tokenSchema,
    onSubmit: async ({ token }) => {
      console.log(token)
      try {
        const response = await verify2FA({token});
        toast.success(response.data.message || "Verify 2FA successful!");
        // console.log("User Respone", response);

        // Navigate to dashboard
        navigate("/dashboard");
      } catch (err) {
        const errorMessage =
        err.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
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
            placeholder="Enter otp"
            formik={formik}
          />
          <button 
          className="w-full text-white font-bold py-2 rounded transition flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
          type="submit"
          >Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default TwoFALogin;
