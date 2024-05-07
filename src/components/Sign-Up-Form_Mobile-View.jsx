import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPhoneSignUp, setIsPhoneSignUp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [countryCode, setCountryCode] = useState("+91");
  const otpInputRefs = useRef([]);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUpToggle = () => {
    setIsPhoneSignUp(!isPhoneSignUp);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
    if (isPhoneSignUp) {
      console.log(
        "Signing up with phone:",
        countryCode + phoneNumber,
        formattedOtp
      );
    } else {
      console.log("Signing up with email:", email, password);
    }
  };
  return (
    <div className="flex flex-col mt-6 w-full h-screen">
      <div className="w-full px-10 py-6">
        <h2 className="text-2xl text-[#000000] font-medium mb-2 ml-2 ">SIGN UP</h2>
        <p className="text-[#222222] text-base font-normal mb-10 ml-2">
        Join Campfly
        </p>
        <form onSubmit={handleSubmit}>
          {!isPhoneSignUp && (
            <>
              <div className="mb-6 border-[1px] border-[#C2C2C2] rounded-lg h-14 relative flex items-center">
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
              <div className="mb-6 border-[1px] border-[#C2C2C2] rounded-lg h-14 relative flex items-center">
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
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
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
              <div className="mb-6 border-[1px] border-[#C2C2C2] rounded-lg h-14 relative flex items-center">
                <label
                  htmlFor="confirmPassword"
                  className="absolute left-4 text-xs -top-2 font-normal bg-white px-1 text-[#AEACAC]"
                >
                  Confirm Password:
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"} 
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full p-2 border-none text-xs ml-3 stars-input font-normal text-[#222222] focus:outline-none bg-transparent z-10`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={handleToggleConfirmPassword}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={
                      showConfirmPassword
                        ? "password-eyeslash.png"
                        : "password-eyeslash.png"
                    }
                    alt={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className="w-4 h-3"
                  />
                </button>
              </div>
            </>
          )}
          {isPhoneSignUp && (
            <>
              <div className="mb-6 border-[1px] border-[#C2C2C2] rounded-lg h-14 relative flex items-center">
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
                    className="ml-12 px-4 py-2  text-[#161EDD] text-[12px] font-medium rounded text-nowrap"
                  >
                    Get OTP
                  </button>
                </div>
              </div>
              <div className="mb-6 border-[1px] border-[#C2C2C2] rounded-lg h-14  relative flex items-center">
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
                        className="w-6 ml-4 text-center text-[12px] font-medium text-[#000000] border-b-[1px] border-[#C2C2C2] focus:outline-none"
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
          <div className="mb-6 flex items-center justify-center">
            <input type="checkbox" id="agreeTerms" className="mr-2 accent-black" required />
            <label
              htmlFor="agreeTerms"
              className="text-[10px] text-[#AEACAC] font-normal"
            >
              Agree with{" "}
              <Link
                to="/"
                className="text-[#000000] text-[10px] font-semibold underline"
              >
                Terms and Conditions
              </Link>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#1ED760] text-base font-normal  text-[#000000] py-2 rounded-lg"
          >
            SIGN UP
          </button>
          <div className="mb-4 mt-6 flex justify-center items-center">
            <hr className="w-full border-t border-[#C2C2C2]" />
            <span className="text-[#AEACAC] px-1 text-[10px] text-nowrap">
              {isPhoneSignUp ? "Or sign up with" : "Or sign up with"}
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
              onClick={handleSignUpToggle}
            >
              <img
                src={isPhoneSignUp ? "gmail-icon.png" : "phone-icon.png"}
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
          <div className="mt-6 text-[10px] text-[#AEACAC] text-center font-normal">
            Already have an account?{" "}
            <Link to="/" className="font-semibold text-[#000000] underline">
              Log In here
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

 
   

export default SignUpForm;
