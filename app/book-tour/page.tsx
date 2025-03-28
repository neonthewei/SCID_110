"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

interface TourBooking {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  participants: number;
}

interface BookingResponse {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  participants: number;
}

const AVAILABLE_DATES = [
  "2024-04-24",
  "2024-04-25",
  "2024-04-28",
  "2024-04-29",
  "2024-04-30",
  "2024-05-01",
  "2024-05-02",
  "2024-05-03",
  "2024-05-04",
  "2024-05-05",
  "2024-05-06",
  "2024-05-07",
  "2024-05-14",
  "2024-05-15",
  "2024-05-16",
  "2024-05-17",
  "2024-05-18",
];

// 每一天特定的時段安排
const DATE_SPECIFIC_TIME_SLOTS: Record<
  string,
  Array<{
    value: string;
    label: string;
    available: boolean;
    remainingSpots: number;
  }>
> = {
  // 4月
  "2024-04-24": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:00-15:20",
      label: "15:00 - 15:20",
      available: true,
      remainingSpots: 15,
    },
  ],
  "2024-04-25": [
    {
      value: "15:00-15:20",
      label: "15:00 - 15:20",
      available: true,
      remainingSpots: 15,
    },
  ],
  "2024-04-28": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:00-15:20",
      label: "15:00 - 15:20",
      available: true,
      remainingSpots: 15,
    },
  ],
  "2024-04-29": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:00-15:20",
      label: "15:00 - 15:20",
      available: true,
      remainingSpots: 15,
    },
  ],
  "2024-04-30": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:00-15:20",
      label: "15:00 - 15:20",
      available: true,
      remainingSpots: 15,
    },
  ],
  // 5月
  "2024-05-01": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:00-15:20",
      label: "15:00 - 15:20",
      available: true,
      remainingSpots: 15,
    },
  ],
  "2024-05-02": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:00-15:20",
      label: "15:00 - 15:20",
      available: true,
      remainingSpots: 15,
    },
  ],
  "2024-05-03": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "14:00-14:20",
      label: "14:00 - 14:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:30-15:50",
      label: "15:30 - 15:50",
      available: true,
      remainingSpots: 15,
    },
  ],
  "2024-05-04": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "14:00-14:20",
      label: "14:00 - 14:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:30-15:50",
      label: "15:30 - 15:50",
      available: true,
      remainingSpots: 15,
    },
  ],
  "2024-05-05": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:00-15:20",
      label: "15:00 - 15:20",
      available: true,
      remainingSpots: 15,
    },
  ],
  "2024-05-06": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:00-15:20",
      label: "15:00 - 15:20",
      available: true,
      remainingSpots: 15,
    },
  ],
  "2024-05-07": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:00-15:20",
      label: "15:00 - 15:20",
      available: true,
      remainingSpots: 15,
    },
  ],
  "2024-05-14": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:00-15:20",
      label: "15:00 - 15:20",
      available: true,
      remainingSpots: 15,
    },
  ],
  "2024-05-15": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:00-15:20",
      label: "15:00 - 15:20",
      available: true,
      remainingSpots: 15,
    },
  ],
  "2024-05-16": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:00-15:20",
      label: "15:00 - 15:20",
      available: true,
      remainingSpots: 15,
    },
  ],
  "2024-05-17": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "14:00-14:20",
      label: "14:00 - 14:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:30-15:50",
      label: "15:30 - 15:50",
      available: true,
      remainingSpots: 15,
    },
  ],
  "2024-05-18": [
    {
      value: "11:00-11:20",
      label: "11:00 - 11:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "14:00-14:20",
      label: "14:00 - 14:20",
      available: true,
      remainingSpots: 15,
    },
    {
      value: "15:30-15:50",
      label: "15:30 - 15:50",
      available: true,
      remainingSpots: 15,
    },
  ],
};

const BACKGROUND_IMAGES = [
  "/reserve/reserve_bg_4.png",
  "/reserve/reserve_bg_1.png",
  "/reserve/reserve_bg_2.png",
  "/reserve/reserve_bg_3.png",
];

export default function BookTourPage() {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showBookings, setShowBookings] = useState(false);
  const [isSmallHeight, setIsSmallHeight] = useState(false);
  const [fallingImages, setFallingImages] = useState<
    Array<{
      id: number;
      src: string;
      left: string;
      delay: number;
      size: number;
      duration: number;
      createdAt?: number;
      imageIndex: number;
    }>
  >([]);
  const imageCounterRef = useRef(0);
  const uniqueIdCounterRef = useRef(0);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TourBooking>({
    defaultValues: {
      date: AVAILABLE_DATES[0],
      time: "",
      name: "",
      email: "",
      phone: "",
      participants: undefined,
    },
  });

  const watchDate = watch("date");
  const watchTime = watch("time");

  // 檢查視窗高度
  useEffect(() => {
    const checkHeight = () => {
      setIsSmallHeight(window.innerHeight < 900);
    };

    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, []);

  // Initialize falling images
  useEffect(() => {
    const startTime = Date.now();

    const getUniqueId = () => {
      uniqueIdCounterRef.current += 1;
      return uniqueIdCounterRef.current;
    };

    const generateImage = (
      forceSide?: "left" | "right",
      forceImageIndex?: number
    ) => {
      const imageIndex =
        forceImageIndex !== undefined
          ? forceImageIndex
          : imageCounterRef.current % BACKGROUND_IMAGES.length;

      // 根據指定或交替決定左右側
      const isLeftSide = forceSide
        ? forceSide === "left"
        : imageIndex % 2 === 0;

      const position = isLeftSide
        ? `${-10 + Math.random() * 25}%` // 左側 -10-15%
        : `${55 + Math.random() * 35}%`; // 右側 55-90%

      return {
        id: getUniqueId(),
        src: BACKGROUND_IMAGES[imageIndex],
        left: position,
        delay: 0,
        size: 500,
        duration: 20 + Math.random() * 10,
        createdAt: Date.now(),
        imageIndex,
      };
    };

    // 初始化空陣列
    setFallingImages([]);

    // 定期添加新圖片
    const interval = setInterval(() => {
      setFallingImages((prev) => {
        const now = Date.now();
        // 先過濾掉已經完成動畫的圖片
        const filteredImages = prev.filter((img) => {
          const imgAge = now - (img.createdAt || startTime);
          return imgAge < img.duration * 1000;
        });

        // 計算下一個圖片的索引
        const currentImages = filteredImages.slice(-2);
        const lastImageIndex =
          currentImages.length > 0
            ? (currentImages[currentImages.length - 1].imageIndex + 1) %
              BACKGROUND_IMAGES.length
            : 0;
        const nextImageIndex = (lastImageIndex + 1) % BACKGROUND_IMAGES.length;

        // 生成兩張新圖片，確保它們分別在左右兩側
        const firstImage = {
          ...generateImage("left", lastImageIndex),
          delay: 0,
        };

        const secondImage = {
          ...generateImage("right", nextImageIndex),
          delay: 1.5, // 減少延遲到1.5秒
        };

        return [...filteredImages, firstImage, secondImage];
      });
    }, 3000); // 每3秒生成一組新圖片

    return () => clearInterval(interval);
  }, []);

  // 讀取預約記錄
  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/sheets");
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setBookings(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "載入預約記錄失敗");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 當日期改變時，重置時間選擇
  useEffect(() => {
    setValue("time", "");
  }, [watchDate, setValue]);

  // 取得可用的時段
  const getAvailableTimeSlots = (date: string) => {
    if (!date) return [];

    // 檢查該日期是否有可用時段
    const dateTimeSlots = DATE_SPECIFIC_TIME_SLOTS[date] || [];
    if (dateTimeSlots.length === 0) return [];

    // 篩選出該日期的預約記錄
    const dateBookings = bookings.filter((booking) => booking.date === date);

    // 計算每個時段的已預約人數
    const timeSlotParticipants = new Map<string, number>();

    dateBookings.forEach((booking) => {
      const currentCount = timeSlotParticipants.get(booking.time) || 0;
      timeSlotParticipants.set(
        booking.time,
        currentCount + booking.participants
      );
    });

    // 每個時段的人數上限
    const MAX_PARTICIPANTS_PER_SLOT = 15;

    // 返回可用時段列表，考慮人數限制
    return dateTimeSlots.map((slot) => {
      const currentParticipants = timeSlotParticipants.get(slot.value) || 0;
      return {
        ...slot,
        available:
          slot.available && currentParticipants < MAX_PARTICIPANTS_PER_SLOT,
        remainingSpots: MAX_PARTICIPANTS_PER_SLOT - currentParticipants,
      };
    });
  };

  // 提交預約表單
  const onSubmit = async (data: TourBooking) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      reset(); // 重置表單
      fetchBookings(); // 重新讀取預約記錄
      alert("預約成功！我們會盡快與您聯繫。");
    } catch (err) {
      setError(err instanceof Error ? err.message : "預約提交失敗");
    } finally {
      setIsLoading(false);
    }
  };

  // 獲取時段選項
  const timeSlots = watchDate ? getAvailableTimeSlots(watchDate) : [];

  // 處理下一步
  const handleNextStep = () => {
    if (watchDate && watchTime) {
      setCurrentStep(2);
    }
  };

  // 處理返回上一步
  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key && event.key.toLowerCase() === "p") {
        setShowBookings((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      className={`
      bg-gray-50 relative overflow-hidden
      ${
        isSmallHeight
          ? "min-h-full pb-32"
          : "min-h-screen md:min-h-0 md:h-[calc(100vh-8rem)]"
      }
    `}
    >
      <style jsx global>{`
        @keyframes fallAndRotate {
          0% {
            transform: translateY(-40vh) rotate(0deg);
            opacity: 0;
          }
          3% {
            opacity: 0.6;
          }
          97% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(300vh) rotate(360deg);
            opacity: 0;
          }
        }

        .falling-image {
          position: fixed;
          pointer-events: none;
          z-index: 10;
          will-change: transform;
          top: 0;
          opacity: 0;
          width: 300px;
        }

        @media (min-width: 768px) {
          .falling-image {
            width: 500px;
          }
        }
      `}</style>

      {fallingImages.map((image) => (
        <img
          key={image.id}
          src={image.src}
          alt=""
          className="falling-image"
          style={{
            left: image.left,
            animation: `fallAndRotate ${image.duration}s linear ${image.delay}s forwards`,
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto relative z-[20] w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center mb-10 mt-5">
          <h1 className="text-title mb-4">填寫預約表單</h1>
          <div className="block sm:hidden">
            <p className="text-body text-[#7D7D7D]">
              展覽期間 (04/24 - 05/18) 導覽時段依日期而不同
            </p>
            <p className="text-body text-[#7D7D7D]">
              精華導覽20分鐘，一起窺探展區精選作品。
            </p>
          </div>
          <div className="hidden sm:block">
            <p className="text-body text-[#7D7D7D]">
              展覽期間 (04/24 - 05/18) 導覽時段依日期而不同
            </p>
            <p className="text-body text-[#7D7D7D]">
              精華導覽20分鐘，一起窺探展區精選作品，了解作品核心與價值。
            </p>
          </div>
        </div>

        {/* 預約表單 */}
        <div className="bg-white shadow rounded-2xl p-6 mb-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* 步驟指示器 */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex flex-col items-center sm:flex-row sm:items-center">
                <div className="flex flex-col items-center sm:flex-row sm:items-center">
                  <span
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-subtitle transition-colors duration-300 ${
                      currentStep === 1
                        ? "border-black bg-black text-white"
                        : "border-gray-300"
                    }`}
                  >
                    1
                  </span>
                  <span
                    className={`block sm:ml-2 mt-2 sm:mt-0 text-subtitle text-center ${
                      currentStep === 1 ? "text-black" : "text-gray-400"
                    }`}
                  >
                    選擇時間
                  </span>
                </div>
              </div>
              <div
                className={`w-12 sm:w-16 h-0.5 mx-2 sm:mx-4 self-start mt-4 sm:mt-0 sm:self-center transition-colors duration-300 ${
                  currentStep === 2 ? "bg-black" : "bg-gray-300"
                }`}
              />
              <div className="flex flex-col items-center sm:flex-row sm:items-center">
                <div className="flex flex-col items-center sm:flex-row sm:items-center">
                  <span
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-subtitle transition-colors duration-300 ${
                      currentStep === 2
                        ? "border-black bg-black text-white"
                        : "border-gray-300"
                    }`}
                  >
                    2
                  </span>
                  <span
                    className={`block sm:ml-2 mt-2 sm:mt-0 text-subtitle text-center ${
                      currentStep === 2 ? "text-black" : "text-gray-400"
                    }`}
                  >
                    填寫資料
                  </span>
                </div>
              </div>
            </div>

            {currentStep === 1 && (
              /* 第一步：選擇日期和時間 */
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-body text-gray-700">
                      參觀日期
                    </label>
                    <select
                      {...register("date", { required: "請選擇參觀日期" })}
                      className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 py-3 px-4 text-body"
                    >
                      {AVAILABLE_DATES.map((date) => (
                        <option key={date} value={date}>
                          {new Date(date).toLocaleDateString("zh-TW", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            weekday: "long",
                          })}
                        </option>
                      ))}
                    </select>
                    {errors.date && (
                      <p className="mt-1 text-caption text-red-600">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-body text-gray-700 mb-3">
                      參觀時間
                    </label>
                    {timeSlots.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {timeSlots.map((slot) => (
                          <div key={slot.value} className="flex-grow">
                            <input
                              type="radio"
                              id={slot.value}
                              value={slot.value}
                              disabled={!slot.available}
                              {...register("time", {
                                required: "請選擇參觀時間",
                              })}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={slot.value}
                              className={`group relative flex flex-col items-center justify-center px-4 py-3 border-2 rounded-2xl w-full h-[75px] transition-all duration-200
                                ${
                                  !slot.available
                                    ? "bg-gray-50 border-gray-100 cursor-not-allowed"
                                    : "cursor-pointer hover:shadow-sm hover:bg-gray-50 border-gray-200 hover:border-gray-300 peer-checked:bg-gray-50 peer-checked:border-black peer-checked:border-[2.5px] peer-checked:shadow-sm"
                                }
                              `}
                            >
                              {slot.available && (
                                <div className="absolute top-1 right-1 w-3 h-3 rounded-full hidden peer-checked:block bg-black"></div>
                              )}
                              <span
                                className={`text-body font-medium
                                ${
                                  !slot.available
                                    ? "text-gray-300"
                                    : "text-gray-900 peer-checked:text-black peer-checked:font-semibold"
                                }
                              `}
                              >
                                {slot.label}
                              </span>
                              {slot.available && (
                                <span className="block text-caption text-gray-500 mt-1">
                                  剩餘{" "}
                                  <span className="font-medium text-gray-700">
                                    {slot.remainingSpots}
                                  </span>{" "}
                                  位
                                </span>
                              )}
                              {!slot.available && slot.remainingSpots <= 0 && (
                                <span className="block text-caption text-gray-300 mt-1">
                                  已額滿
                                </span>
                              )}
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="py-4 text-body text-center text-gray-500 border-2 border-gray-100 rounded-2xl bg-gray-50">
                        此日無可預約時段
                      </p>
                    )}
                    {errors.time && (
                      <p className="mt-2 text-caption text-red-600">
                        {errors.time.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!watchDate || !watchTime}
                    className="inline-flex justify-center rounded-2xl border border-transparent bg-black py-3 px-6 text-subtitle text-white shadow-sm hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-black"
                  >
                    下一步
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              /* 第二步：填寫個人資料 */
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-body text-gray-700">
                      姓名
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: "請輸入姓名" })}
                      className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 py-3 px-4 text-body"
                    />
                    {errors.name && (
                      <p className="mt-1 text-caption text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-body text-gray-700">
                      電子郵件
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "請輸入電子郵件",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "請輸入有效的電子郵件地址",
                        },
                      })}
                      className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 py-3 px-4 text-body"
                    />
                    {errors.email && (
                      <p className="mt-1 text-caption text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-body text-gray-700">
                      電話
                    </label>
                    <input
                      type="tel"
                      {...register("phone", { required: "請輸入電話號碼" })}
                      className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 py-3 px-4 text-body"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-caption text-red-600">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-body text-gray-700">
                      參觀人數
                    </label>
                    <input
                      type="number"
                      {...register("participants", {
                        required: "請輸入參觀人數",
                        min: { value: 1, message: "至少1人" },
                        max: { value: 15, message: "最多15人" },
                      })}
                      className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 py-3 px-4 text-body"
                    />
                    {errors.participants && (
                      <p className="mt-1 text-caption text-red-600">
                        {errors.participants.message}
                      </p>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-subtitle text-red-800">{error}</h3>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex justify-center rounded-2xl border border-gray-300 bg-white py-3 px-6 text-body text-gray-700 shadow-sm hover:bg-gray-50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    返回
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center rounded-2xl border border-transparent bg-black py-3 px-6 text-body text-white shadow-sm hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-black"
                  >
                    {isLoading ? "提交中..." : "提交預約"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* 注意事項 */}
        <div className="bg-white shadow rounded-2xl p-6 mb-8">
          <p className="text-subtitle text-gray-900 mb-3">注意事項</p>
          <ul className="space-y-2.5">
            <li className="flex items-center text-body text-gray-500">
              <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
              每日導覽時間不同，請查看預約表選擇合適的時段
            </li>
            <li className="flex items-center text-body text-gray-500">
              <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
              務必注意資訊填寫正確
            </li>
            <li className="flex items-center text-body text-gray-500">
              <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
              預約成功會於2天內以EMAIL通知
            </li>
          </ul>
        </div>

        {/* 預約記錄列表 */}
        {showBookings && (
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-title mb-4">最近預約記錄</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-caption text-gray-500 uppercase tracking-wider">
                      姓名
                    </th>
                    <th className="px-6 py-3 text-left text-caption text-gray-500 uppercase tracking-wider">
                      日期
                    </th>
                    <th className="px-6 py-3 text-left text-caption text-gray-500 uppercase tracking-wider">
                      時間
                    </th>
                    <th className="px-6 py-3 text-left text-caption text-gray-500 uppercase tracking-wider">
                      人數
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-body text-gray-900">
                        {booking.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-body text-gray-500">
                        {new Date(booking.date).toLocaleDateString("zh-TW", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          weekday: "long",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-body text-gray-500">
                        {booking.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-body text-gray-500">
                        {booking.participants}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
