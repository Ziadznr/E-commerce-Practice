import React, { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase";

const PhoneVerify = ({ onSuccess }) => {
  const [phone, setPhone] = useState("+880"); // Default BD country code
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Setup reCAPTCHA once
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "send-otp-btn", {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved
        },
        "expired-callback": () => {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        },
      });
    }
  };

  // ✅ Send OTP
  const sendOtp = () => {
    if (!phone.startsWith("+880") || phone.length < 14) {
      return alert("Enter a valid Bangladeshi number (+8801XXXXXXXXX)");
    }
    setLoading(true);
    setupRecaptcha();

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        setConfirmObj(confirmationResult);
        alert("OTP Sent!");
      })
      .catch((err) => {
        console.error(err);
        alert("OTP sending failed: " + err.message);
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        }
      })
      .finally(() => setLoading(false));
  };

  // ✅ Verify OTP
  const verifyOtp = () => {
    if (!otp || !confirmObj) return alert("Enter the OTP");
    setLoading(true);
    confirmObj
      .confirm(otp)
      .then((res) => {
        alert("Phone verified!");
        if (onSuccess) onSuccess();
      })
      .catch(() => alert("Invalid OTP"))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {/* Hidden container for Firebase reCAPTCHA */}
      <div id="recaptcha-container"></div>

      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+8801XXXXXXXXX"
        className="form-control my-2"
      />

      <button
        id="send-otp-btn"
        onClick={sendOtp}
        className="btn btn-dark w-100"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="form-control my-2"
      />

      <button
        onClick={verifyOtp}
        className="btn btn-success w-100"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
};

export default PhoneVerify;
