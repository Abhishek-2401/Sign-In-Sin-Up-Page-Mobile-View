import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPhoneSignIn, setIsPhoneSignIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [countryCode, setCountryCode] = useState("+91");
  const otpInputRefs = useRef([]);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignInToggle = () => {
    setIsPhoneSignIn(!isPhoneSignIn);
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setOtp(Array(6).fill(""));
    setIsOtpVerified(false);
  };

  const handleGetOTP = () => {
    console.log("Getting OTP for phone:", countryCode + phoneNumber);
    // For demo purposes, setting a static OTP
    setOtp(["1", "2", "3", "4", "5", "6"]);
  };

  const handleOtpChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < otp.length - 1) {
      otpInputRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = () => {
    const formattedOtp = otp.join("");
    // For demo purposes, consider the OTP verified if it matches "123456"
    const isVerified = formattedOtp === "123456";
    setIsOtpVerified(isVerified);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedOtp = otp.join("");
    if (isPhoneSignIn) {
      console.log(
        "Signing in with phone:",
        countryCode + phoneNumber,
        formattedOtp
      );
    } else {
      console.log("Signing in with email:", email, password);
    }
  };

  const handleSignUpToggle = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className="flex flex-col mt-6 w-full h-screen">
      <div className="w-full px-10 py-6">
        <h2 className="text-2xl text-[#000000] font-medium mb-2 ml-2 ">SIGN IN</h2>
        <p className="text-[#222222] text-base font-normal mb-10 ml-2">
          Hi, Welcome Back to Campfly
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isPhoneSignIn && (
            <>
              <div className="border border-[#C2C2C2] rounded-lg h-14 relative flex items-center">
                <label
                  htmlFor="email"
                  className="absolute left-4 text-xs -top-2 font-normal bg-white px-1 text-[#AEACAC]"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border-none text-xs ml-3 font-normal text-[#222222] focus:outline-none bg-transparent z-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="border border-[#C2C2C2] rounded-lg h-14 relative flex items-center">
                <label
                  htmlFor="password"
                  className="absolute left-4 text-xs -top-2 font-normal bg-white px-1 text-[#AEACAC]"
                >
                  Password:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-2 border-none text-xs ml-3 stars-input font-normal text-[#222222] focus:outline-none bg-transparent z-10`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={
                      showPassword
                        ? "password-eyeslash.png"
                        : "password-eyeslash.png"
                    }
                    alt={showPassword ? "Hide password" : "Show password"}
                    className="w-4 h-3"
                  />
                </button>
              </div>
            </>
          )}
          {isPhoneSignIn && (
            <>
              <div className="border border-[#C2C2C2] rounded-lg h-14 relative flex items-center">
                <label
                  htmlFor="phoneNumber"
                  className="absolute left-4 text-xs -top-2 font-normal bg-white px-1 text-[#AEACAC]"
                >
                  Phone Number:
                </label>
                <div className="flex items-center">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="p-2 border-r-2 font-normal rounded-l text-[12px] text-[#787878] focus:outline-none bg-transparent z-10"
                  >
                    <option value="+1">+1</option>
                    <option value="+91">+91</option>
                  </select>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-2 text-[12px] text[#222222] border-none focus:outline-none bg-transparent z-10 rounded-r"
                    placeholder="Enter your phone number"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleGetOTP}
                    className="ml-14 px-4 py-2  text-[#161EDD] text-[12px] font-medium rounded text-nowrap"
                  >
                    Get OTP
                  </button>
                </div>
              </div>
              <div className="border border-[#C2C2C2] rounded-lg h-14  relative flex items-center">
                <label
                  htmlFor="otp"
                  className="absolute left-4 text-xs -top-2 font-normal bg-white px-1 text-[#AEACAC]"
                >
                  Enter OTP
                </label>
                <div className="flex justify-between w-full p-2 border-none focus:outline-none bg-transparent z-10">
                  {otp.map((value, index) => (
                    <div key={index} className="relative">
                      <input
                        ref={(el) => (otpInputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        className="w-6 ml-4  text-center text-[12px] font-medium text-[#000000] border-b-[1px] border-[#C2C2C2] focus:outline-none"
                        value={value}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="bg-transparent text-[12px] font-medium px-4 py-1 rounded"
                    style={{ color: isOtpVerified ? "#1ED760" : "#FF0000" }}
                    onClick={isOtpVerified ? null : handleVerifyOTP}
                  >
                    {isOtpVerified ? "Verified" : "Verify"}
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-[#AEACAC] font-normal text-[10px] underline focus:outline-none mr-2"
            >
              {isPhoneSignIn ? "Resend OTP" : "Forgot Password?"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full  bg-[#1ED760] text-sm font-normal  text-[#000000] py-3 rounded-lg"
          >
            SIGN IN
          </button>
          <div className="mb-4 mt-6 flex justify-center items-center">
            <hr className="w-full border-t border-[#C2C2C2]" />
            <span className="text-[#AEACAC] px-2 text-[10px] text-nowrap">
              {isPhoneSignIn ? "Or sign in with" : "Or sign in with"}
            </span>
            <hr className="w-full border-t border-[#C2C2C2]" />
          </div>
          <div className="flex mt-2 justify-center">
            <button
              type="button"
              className="rounded-full bg-white border-[#E0E0E0] border-[1px]  px-2 py-2 mr-4"
            >
              <img src="google-icon.png" alt="" />
            </button>
            <button
              type="button"
              className="rounded-full bg-white border-[#E0E0E0] border-[1px]  px-2 py-2 mr-4"
              onClick={handleSignInToggle}
            >
              <img
                src={isPhoneSignIn ? "gmail-icon.png" : "phone-icon.png"}
                alt=""
              />
            </button>
            <button
              type="button"
              className="rounded-full bg-white border-[#E0E0E0] border-[1px]  px-2 py-2 mr-4"
            >
              <img src="facebook-icon.png" alt="" />
            </button>
          </div>
          <div className="mt-6 text-[10px] text-center text-gray-500 font-normal">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold underline">
              Join Campfly here
            </Link>
          </div>
        </form>
      </div>
      
      <div className="lg:block lg:w-1/2 text-center ">
        <img src="amico.png" alt="Sign In Image" className="w-auto h-auto mx-auto" />
      </div>
    </div>
  );
};

export default SignInForm;
