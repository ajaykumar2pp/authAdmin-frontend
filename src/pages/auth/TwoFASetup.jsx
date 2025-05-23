import React, { useState, useEffect, useLocation } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { generate2FA } from "../../api/authAPI";


const TwoFASetup = () => {
  const [qrData, setQrData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQR = async () => {
      try {
        const res = await generate2FA();
         console.log(res)
        setQrData(res.data);
  
      } catch (err) {
        toast.error("Error fetching QR code");
        navigate("/login");
      }
    };
    fetchQR();
  }, [navigate]);

  return  (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Two-Factor Authentication</h2>
        {qrData ? (
          <>
            <img src={qrData.qrCode} alt="QR Code" className="mx-auto my-4" />
            <p className="text-gray-700 text-sm break-all">
              Secret: <strong>{qrData.secret}</strong>
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Scan this QR in Google Authenticator and continue.
            </p>
            <button
              onClick={() => navigate('/verify-otp/' + qrData.userId)}
              className="btn mt-6"
            >
              Continue to Verify OTP
            </button>
          </>
        ) : (
          <p>Loading QR Code...</p>
        )}
      </div>
    </div>
  );
};

export default TwoFASetup;
