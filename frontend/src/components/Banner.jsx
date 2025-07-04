import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner from "../assets/banner.jpg";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const bannerData = [
  {
    id: 1,
    title: "ORDER UP",
    subtitle1: "Tiết Kiệm Thời Gian",
    subtitle2: "Ưu Đãi Ngập Tràn",
    buttonText: "Đặt món ngay",
    backgroundImage: banner,
  },
  {
    id: 2,
    bgColor: "bg-green-500", // Có thể đổi màu nếu muốn
    title: "ORDER UP",
    subtitle1: "Nhanh Chóng Tiện Lợi",
    subtitle2: "Món Ngon Mỗi Ngày",
    buttonText: "Đặt món ngay",
    backgroundImage:
      "https://res.cloudinary.com/dwwyrgl2y/image/upload/v1751215161/Facebook_Banner_Design_eviowm.jpg",
  },
  {
    id: 3,
    bgColor: "bg-green-500", // Có thể đổi màu nếu muốn
    title: "ORDER UP",
    subtitle1: "Nhanh Chóng Tiện Lợi",
    subtitle2: "Món Ngon Mỗi Ngày",
    buttonText: "Đặt món ngay",
    backgroundImage:
      "https://res.cloudinary.com/dwwyrgl2y/image/upload/v1751215423/download_1_uunb0y.jpg",
  },
  // Thêm các slide khác nếu cần
];

export default function Banner() {
  return (
    <div className="relative h-auto mb-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0} // Không có khoảng cách giữa các slide
        slidesPerView={1} // Hiển thị 1 slide mỗi lần
        navigation // Kích hoạt nút điều hướng (trái/phải)
        pagination={{ clickable: true }} // Kích hoạt chấm tròn điều hướng
        loop={true} // Lặp lại banner
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="w-[66%]"
      >
        {bannerData.map((slide) => (
          <SwiperSlide
            key={slide.id}
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            className="bg-cover bg-center bg-no-repeat relative bg-gray-100 w-full"
          >
            <div className="container mx-auto flex flex-col items-center justify-center min-h-[300px] md:min-h-[500px] lg:min-h-[600px] text-white relative z-10 p-4 text-center"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
