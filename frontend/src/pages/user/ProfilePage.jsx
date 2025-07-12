import {
  faCalendarDay,
  faCircleUser,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ChangePasswordPopUp from "../../components/ChangePasswordPopUp";
import { useAuth } from "../../components/common/AuthContext";
import CustomSelect from "../../components/CustomSelect";
import { uploadImage } from "../../services/cloudinary";
import {
  getUserbyId,
  updateUser,
} from "../../services/userServices/profileService";
import { formatDateVN2 } from "../../utils/Format";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [showPopUp, setShowPopup] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [fileSelected, setFileSelected] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUpLoading, setIsUpLoading] = useState(false);
  const { user } = useAuth();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, WebP)");
        return;
      }
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("File quá lớn. Vui lòng chọn file nhỏ hơn 5MB");
        return;
      }
      setFileSelected(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdated = async () => {
    const isFilled = Object.values(userDetail).every(
      (value) => value && value.trim() !== ""
    );
    if (!isFilled) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    let tmp = {
      name: userDetail.name,
      dob: userDetail.dob,
      gender: userDetail.gender,
      avatar: userDetail.avatar,
    };
    if (fileSelected) {
      setIsUpLoading(true);
      await uploadImage(fileSelected).then((res) => {
        console.log(res)
        tmp = {
          ...userDetail,
          avatar: res.imageUrl,
        };
        setUserDetail(tmp);
      });
    }
    console.log(tmp);
    await updateUser(user.id, tmp);
    setFileSelected(null);
    setPreviewImage(null);
    setIsUpLoading(false);
    toast.success("Cập nhật thông tin thành công");
  };

  useEffect(() => {
    getUserbyId(user.id).then((res) => {
      console.log(res);
      setUserDetail(res);
    });
  }, [user]);
  return (
    <div className="w-[60vw] mx-auto">
      <p className="dancing-script-700 text-7xl ">Profile</p>
      <hr className="mb-10" />
      <div className="flex justify-between">
        <div className=" w-[60%] space-y-10 border p-8 rounded-2xl bg-white">
          <div className="flex justify-between">
            <div className="text-xl w-[70%] text-gray-400 space-y-2">
              <p className="font-semibold">Tên đầy đủ</p>
              <div className="border-b space-x-2">
                <FontAwesomeIcon icon={faCircleUser} />
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-[90%] focus:outline-none"
                  defaultValue={userDetail.name}
                  onChange={(e) =>
                    setUserDetail({ ...userDetail, name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="text-xl text-gray-400 space-y-2">
              <p className="font-semibold">Giới tính</p>
              <div className="flex items-center space-x-2 ">
                <div className="text-black">
                  <CustomSelect
                    options={[
                      { name: "Nam", value: "nam" },
                      { name: "Nữ", value: "nữ" },
                    ]}
                    handleChange={(value) =>
                      setUserDetail({ ...userDetail, gender: value })
                    }
                    selected={userDetail.gender}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-xl text-gray-400 space-y-2">
            <p className="font-semibold">Ngày sinh</p>
            <div className="border-b space-x-2">
              <FontAwesomeIcon icon={faCalendarDay} />
              <input
                type="date"
                className="w-[90%] focus:outline-none"
                defaultValue={formatDateVN2(userDetail.dob)}
                onChange={(e) =>
                  setUserDetail({ ...userDetail, dob: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 w-[40%]">
          <div className="size-40 overflow-hidden bg-gray-100">
            <img
              src={previewImage || userDetail.avatar}
              alt="Avatar"
              className="size-40 object-cover rounded-full text-center "
            />
          </div>
          <label className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer text-sm hover:bg-red-600 transition">
            Thay hình ảnh
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
        </div>
      </div>
      <div className="flex w-fit gap-5 mt-10">
        <button
          className={`  px-4 py-2 rounded text-sm transition text-white ${
            isUpLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
          onClick={handleUpdated}
        >
          {isUpLoading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />{" "}
              Đang Lưu...{" "}
            </>
          ) : (
            "Lưu Thông Tin"
          )}
        </button>
        <button
          className=" bg-red-500 px-4 py-2 rounded text-sm hover:bg-red-600 transition text-white"
          onClick={() => setShowPopup(true)}
        >
          Đổi mật khẩu
        </button>
      </div>
      {showPopUp && (
        <ChangePasswordPopUp handleClose={setShowPopup} token={user.token} />
      )}
    </div>
  );
}
