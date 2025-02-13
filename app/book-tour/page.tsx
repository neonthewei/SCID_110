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

export default function BookTourPage() {
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

  useEffect(() => {
    fetchBookings();
  }, []);

  // 當日期改變時，重置時間選擇
  useEffect(() => {
    setValue('time', '');
  }, [watchDate, setValue]);

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-gray-600 text-base">填寫表單,預約實踐展區導覽</p>
        </div>

        {/* 預約表單 */}
        <div className="bg-white shadow rounded-2xl p-6 mb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* 步驟指示器 */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex flex-col items-center sm:flex-row sm:items-center">
                <div className="flex flex-col items-center sm:flex-row sm:items-center">
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium transition-colors duration-300 ${
                    currentStep === 1 ? 'border-black bg-black text-white' : 'border-gray-300'
                  }`}>1</span>
                  <span className={`block sm:ml-2 mt-2 sm:mt-0 text-sm font-medium text-center ${currentStep === 1 ? 'text-black' : 'text-gray-400'}`}>選擇時間</span>
                </div>
              </div>
              <div className={`w-12 sm:w-16 h-0.5 mx-2 sm:mx-4 self-start mt-4 sm:mt-0 sm:self-center transition-colors duration-300 ${currentStep === 2 ? 'bg-black' : 'bg-gray-300'}`} />
              <div className="flex flex-col items-center sm:flex-row sm:items-center">
                <div className="flex flex-col items-center sm:flex-row sm:items-center">
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium transition-colors duration-300 ${
                    currentStep === 2 ? 'border-black bg-black text-white' : 'border-gray-300'
                  }`}>2</span>
                  <span className={`block sm:ml-2 mt-2 sm:mt-0 text-sm font-medium text-center ${currentStep === 2 ? 'text-black' : 'text-gray-400'}`}>填寫資料</span>
                </div>
              </div>
            </div>

            {currentStep === 1 && (
              /* 第一步：選擇日期和時間 */
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">參觀日期</label>
                    <select
                      {...register('date', { required: '請選擇參觀日期' })}
                      className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 py-3 px-4 text-base"
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
                    {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">參觀時間</label>
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
                            <span className={`font-medium
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
                      <p className="mt-2 text-sm text-red-600">{errors.time.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!watchDate || !watchTime}
                    className="inline-flex justify-center rounded-2xl border border-transparent bg-black py-3 px-6 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-black"
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
                    <label className="block text-sm font-medium text-gray-700">姓名</label>
                    <input
                      type="text"
                      {...register('name', { required: '請輸入姓名' })}
                      className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 py-3 px-4 text-base"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">電子郵件</label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: '請輸入電子郵件',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: '請輸入有效的電子郵件地址'
                        }
                      })}
                      className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 py-3 px-4 text-base"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">電話</label>
                    <input
                      type="tel"
                      {...register('phone', { required: '請輸入電話號碼' })}
                      className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 py-3 px-4 text-base"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">參觀人數</label>
                    <input
                      type="number"
                      {...register('participants', { 
                        required: '請輸入參觀人數',
                        min: { value: 1, message: '至少1人' },
                        max: { value: 20, message: '最多20人' }
                      })}
                      className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-black focus:ring-black transition-colors duration-300 py-3 px-4 text-base"
                    />
                    {errors.participants && <p className="mt-1 text-sm text-red-600">{errors.participants.message}</p>}
                  </div>
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">{error}</h3>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex justify-center rounded-2xl border border-gray-300 bg-white py-3 px-6 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    返回
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center rounded-2xl border border-transparent bg-black py-3 px-6 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-black"
                  >
                    {isLoading ? '提交中...' : '提交預約'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* 預約記錄列表 */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">最近預約記錄</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時間</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">人數</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.date).toLocaleDateString('zh-TW', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        weekday: 'long'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.participants}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

