if (user.twoFactorEnabled) {
  return res.status(200).json({
    message: "2FA required",
    twoFactorEnabled: true,
    email: user.email,
  });
} else {
  return res.status(200).json({
    message: "2FA setup required",
    twoFactorEnabled: false,
    email: user.email,
  });
}


// **************
if (res.data.twoFactorEnabled) {
  navigate("/verify-otp");  // Just enter OTP
} else {
  navigate("/setup-2fa");   // Scan QR + Enter OTP
}


import { useState } from "react";
import axios from "axios";
import QRSetupPage from "./QRSetupPage";
import OTPVerifyPage from "./OTPVerifyPage";

function Login() {
  const [step, setStep] = useState("login"); // login | setup2fa | verify2fa
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [userId, setUserId] = useState("");

  const handleLogin = async (email, password) => {
    const res = await axios.post("/api/auth/login", { email, password }, { withCredentials: true });

    if (res.data.twoFactor) {
      setUserId(res.data.userId);
      setTwoFactorEnabled(res.data.twoFactorEnabled);

      if (res.data.twoFactorEnabled) {
        setStep("verify2fa"); // user already has 2FA -> go to OTP
      } else {
        setStep("setup2fa"); // new user -> show QR
      }
    } else {
      // No 2FA needed, direct login success
      // Redirect to dashboard
    }
  };

  return (
    <>
      {step === "login" && <LoginForm onSubmit={handleLogin} />}
      {step === "setup2fa" && <QRSetupPage userId={userId} onSetupComplete={() => setStep("verify2fa")} />}
      {step === "verify2fa" && <OTPVerifyPage userId={userId} />}
    </>
  );
}

// Inside login controller
if (user.twoFactorEnabled) {
  return res.status(200).json({
    message: "2FA required",
    twoFactorEnabled: true,
    userId: user._id, // or a temp token
  });
} else {
  // If no 2FA, login directly
  const tokenJWT = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.cookie("token", tokenJWT, {
    httpOnly: true,
    sameSite: "Lax",
    maxAge: 24 * 60 * 60 * 1000
  });
  return res.status(200).json({ message: "Login successful" });
}

