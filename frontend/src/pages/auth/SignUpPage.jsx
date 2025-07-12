import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loginImage from "../../assets/loginImage.png";
import {
  faCalendar,
  faEnvelope,
  faLockOpen,
  faUser,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../../services/authServices/authServices";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
  });
  const nav = useNavigate();

  const handleSignUp = () => {
    const isFilled = Object.values(data).every(
      (value) => value && value.trim() !== ""
    );
    if (!isFilled) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    console.log(data);
    signUp(data).then((res) => {
      if (res && res.id) {
        toast.success("Tạo tài khoản thành công");
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
          <div className="text-white border-b py-2 text-xl space-x-2 opacity-90 flex items-center mt-4">
            <FontAwesomeIcon icon={faCalendar} />
            <input
              type="date"
              onChange={(e) => setData({ ...data, dob: e.target.value })}
              placeholder="Date of birth"
              className="focus:outline-none focus:ring-0 focus:border-none w-full"
            />
          </div>
          <div className="text-white border-b py-2 text-xl space-x-2 opacity-90 flex items-center mt-4">
            <FontAwesomeIcon icon={faVenusMars} />
            <select
              value={data.gender}
              className="w-full focus:outline-none"
              onChange={(e) => setData({ ...data, gender: e.target.value })}
            >
              <option value="" disabled hidden>
                Chọn giới tính
              </option>
              <option value="nam" className="text-black">
                Nam
              </option>
              <option value="nữ" className="text-black">
                Nữ
              </option>
            </select>
          </div>
          <div className="text-white border-b py-2 text-xl space-x-2 opacity-90 flex items-center mt-4">
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="text"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Email"
              className="focus:outline-none focus:ring-0 focus:border-none w-full"
            />
          </div>
          <div className="text-white border-b py-2 text-xl space-x-2 opacity-90 flex items-center mt-4">
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
          className="w-[90%] mx-auto bg-lime-500 p-3 text-xl text-white rounded-3xl"
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
        <p className="text-center text-sm text-white font-light">
          By creating an account, you agree to our{" "}
          <span className="text-lime-500">Terms & Conditions</span>
        </p>
      </div>
    </div>
  );
}
