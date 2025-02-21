'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

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
  '2025-02-13',
  '2025-02-14',
  '2025-02-15',
  '2025-02-16',
  '2025-02-17'
];

const TIME_SLOTS = [
  { value: '10:00', label: '上午 10:00' },
  { value: '14:00', label: '下午 02:00' },
  { value: '16:00', label: '下午 04:00' }
];

export default function BookTourForm() {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<TourBooking>({
    defaultValues: {
      date: AVAILABLE_DATES[0],
      time: '',
      name: '',
      email: '',
      phone: '',
      participants: undefined
    }
  });

  const watchDate = watch('date');
  const watchTime = watch('time');

  // 讀取預約記錄
  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/sheets');
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setBookings(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入預約記錄失敗');
    }
  };

  // 當日期改變時，重置時間選擇
  useEffect(() => {
    setValue('time', '');
  }, [watchDate, setValue]);

  // 在組件掛載時獲取預約記錄
  useEffect(() => {
    fetchBookings();
  }, []);

  // 取得可用的時段
  const getAvailableTimeSlots = (date: string) => {
    if (!date) return [];
    const dateBookings = bookings.filter(booking => booking.date === date);
    const bookedTimes = new Set(dateBookings.map(booking => booking.time));
    
    return TIME_SLOTS.map(slot => ({
      ...slot,
      available: !bookedTimes.has(slot.value)
    }));
  };

  // 提交預約表單
  const onSubmit = async (data: TourBooking) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      reset(); // 重置表單
      fetchBookings(); // 重新讀取預約記錄
      alert('預約成功！我們會盡快與您聯繫。');
    } catch (err) {
      setError(err instanceof Error ? err.message : '預約提交失敗');
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

  return (
    <div className="bg-gray-50 relative">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">預約導覽</h2>
          <p className="text-gray-600">展覽期間 (04/27 - 05/07) 每週二和五的下午13:30開始</p>
          <p className="text-gray-600">精華導覽40分鐘，一起窺探展區精選作品，了解作品核心與價值。</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* 步驟指示器 */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex flex-col items-center sm:flex-row sm:items-center">
                <div className="flex flex-col items-center sm:flex-row sm:items-center">
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-subtitle transition-colors duration-300 ${
                    currentStep === 1 ? 'border-black bg-black text-white' : 'border-gray-300'
                  }`}>1</span>
                  <span className={`block sm:ml-2 mt-2 sm:mt-0 text-subtitle text-center ${currentStep === 1 ? 'text-black' : 'text-gray-400'}`}>選擇時間</span>
                </div>
              </div>
              <div className={`w-12 sm:w-16 h-0.5 mx-2 sm:mx-4 self-start mt-4 sm:mt-0 sm:self-center transition-colors duration-300 ${currentStep === 2 ? 'bg-black' : 'bg-gray-300'}`} />
              <div className="flex flex-col items-center sm:flex-row sm:items-center">
                <div className="flex flex-col items-center sm:flex-row sm:items-center">
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-subtitle transition-colors duration-300 ${
                    currentStep === 2 ? 'border-black bg-black text-white' : 'border-gray-300'
                  }`}>2</span>
                  <span className={`block sm:ml-2 mt-2 sm:mt-0 text-subtitle text-center ${currentStep === 2 ? 'text-black' : 'text-gray-400'}`}>填寫資料</span>
                </div>
              </div>
            </div>

            {currentStep === 1 && (
              /* 第一步：選擇日期和時間 */
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-subtitle text-gray-700">參觀日期</label>
                    <select
                      {...register('date', { required: '請選擇參觀日期' })}
                      className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 py-3 px-4 text-body"
                    >
                      {AVAILABLE_DATES.map(date => (
                        <option key={date} value={date}>
                          {new Date(date).toLocaleDateString('zh-TW', { 
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            weekday: 'long'
                          })}
                        </option>
                      ))}
                    </select>
                    {errors.date && <p className="mt-1 text-caption text-red-600">{errors.date.message}</p>}
                  </div>

                  <div>
                    <label className="block text-subtitle text-gray-700 mb-3">參觀時間</label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {timeSlots.map(slot => (
                        <div key={slot.value} className="flex-grow">
                          <input
                            type="radio"
                            id={slot.value}
                            value={slot.value}
                            disabled={!slot.available}
                            {...register('time', { required: '請選擇參觀時間' })}
                            className="peer sr-only"
                          />
                          <label
                            htmlFor={slot.value}
                            className={`group flex items-center justify-center px-4 py-3 border-2 rounded-2xl w-full h-[60px]
                              ${!slot.available ? 'bg-gray-50 border-gray-100 cursor-not-allowed' : 
                                'cursor-pointer hover:bg-gray-50 border-gray-200 hover:border-gray-300 peer-checked:bg-white peer-checked:border-black peer-checked:border-[2.5px]'
                              }
                            `}
                          >
                            <span className={`text-subtitle
                              ${!slot.available ? 'text-gray-300' : 
                                'text-gray-900 peer-checked:text-black peer-checked:font-semibold'
                              }
                            `}>
                              {slot.label}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.time && (
                      <p className="mt-2 text-caption text-red-600">{errors.time.message}</p>
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
                    <label className="block text-subtitle text-gray-700">姓名</label>
                    <input
                      type="text"
                      {...register('name', { required: '請輸入姓名' })}
                      className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 py-3 px-4 text-body"
                    />
                    {errors.name && <p className="mt-1 text-caption text-red-600">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-subtitle text-gray-700">電子郵件</label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: '請輸入電子郵件',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: '請輸入有效的電子郵件地址'
                        }
                      })}
                      className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 py-3 px-4 text-body"
                    />
                    {errors.email && <p className="mt-1 text-caption text-red-600">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-subtitle text-gray-700">電話</label>
                    <input
                      type="tel"
                      {...register('phone', { required: '請輸入電話號碼' })}
                      className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 py-3 px-4 text-body"
                    />
                    {errors.phone && <p className="mt-1 text-caption text-red-600">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-subtitle text-gray-700">參觀人數</label>
                    <input
                      type="number"
                      {...register('participants', { 
                        required: '請輸入參觀人數',
                        min: { value: 1, message: '至少1人' },
                        max: { value: 20, message: '最多20人' }
                      })}
                      className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 py-3 px-4 text-body"
                    />
                    {errors.participants && <p className="mt-1 text-caption text-red-600">{errors.participants.message}</p>}
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
                    className="inline-flex justify-center rounded-2xl border border-gray-300 bg-white py-3 px-6 text-subtitle text-gray-700 shadow-sm hover:bg-gray-50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    返回
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center rounded-2xl border border-transparent bg-black py-3 px-6 text-subtitle text-white shadow-sm hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-black"
                  >
                    {isLoading ? '提交中...' : '提交預約'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* 注意事項 */}
        <div className="bg-white shadow rounded-2xl p-6 mt-4">
          <p className="text-subtitle text-gray-900 mb-3">注意事項</p>
          <ul className="space-y-2.5">
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
      </div>
    </div>
  );
} 