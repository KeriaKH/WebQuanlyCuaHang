import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loginImage from "../../assets/loginImage.png";
import {
  faEnvelope,
  faLockOpen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../../services/authServices/authServices";

export default function SignUpPage() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const nav = useNavigate();

  const handleSignUp = () => {
    signUp(data).then((res) => {
      if (res && res.id) {
        alert("tạo tài khoản thành công");
        nav("/login");
      }
    });
  };
  return (
    <div className="relative w-[65vw] mx-auto">
      <img src={loginImage} alt="" className="mx-auto" />
      <div className="absolute inset-0 space-y-12 flex flex-col w-[30%] top-25 left-40">
        <p className="text-9xl text-white dancing-script-700 text-center">
          Register
        </p>
        <div>
          <div className="text-white border-b py-2 text-xl space-x-2 opacity-90 flex items-center">
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Full Name"
              className="focus:outline-none focus:ring-0 focus:border-none w-full"
            />
          </div>
          <div className="text-white border-b py-2 text-xl space-x-2 opacity-90 flex items-center mt-7">
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="text"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Email"
              className="focus:outline-none focus:ring-0 focus:border-none w-full"
            />
          </div>
          <div className="text-white border-b py-2 text-xl space-x-2 opacity-90 flex items-center mt-7">
            <FontAwesomeIcon icon={faLockOpen} />
            <input
              type="text"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Password"
              className="focus:outline-none focus:ring-0 focus:border-none w-full"
            />
          </div>
        </div>
        <button
          className="w-[90%] mx-auto bg-lime-500 p-3 text-xl text-white rounded-3xl mt-5"
          onClick={handleSignUp}
        >
          Sign up
        </button>
        <p className="text-center text-white font-light">
          If you have an account?{" "}
          <Link to={"/login"}>
            <span className="text-lime-500">Login</span>
          </Link>
        </p>
        <p className="text-center text-sm text-white my-auto font-light">
          By creating an account, you agree to our{" "}
          <span className="text-lime-500">Terms & Conditions</span>
        </p>
      </div>
    </div>
  );
}
