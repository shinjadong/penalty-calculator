"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NumberKeypad } from "../NumberKeypad";

interface Step2MonthlyFeeProps {
  onNext: (amount: number) => void;
}

export function Step2MonthlyFee({ onNext }: Step2MonthlyFeeProps) {
  const [value, setValue] = useState("");
  const [dontKnow, setDontKnow] = useState(false);
  const [showRangeOptions, setShowRangeOptions] = useState(false);

  const handleNumberClick = (num: string) => {
    setValue((prev) => prev + num);
  };

  const handleDelete = () => {
    setValue((prev) => prev.slice(0, -1));
  };

  const handleComplete = () => {
    if (value && parseInt(value) > 0) {
      onNext(parseInt(value));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setDontKnow(checked);
    if (checked) {
      setValue("");
      setShowRangeOptions(true);
    } else {
      setShowRangeOptions(false);
    }
  };

  const handleRangeSelect = (amount: number) => {
    onNext(amount);
  };

  const formatNumber = (num: string) => {
    if (!num) return "";
    return parseInt(num).toLocaleString("ko-KR");
  };

  const rangeOptions = [
    { label: "2만원 이상", value: 20000 },
    { label: "4만원 이상", value: 40000 },
    { label: "6만원 이상", value: 60000 },
    { label: "8만원 이상", value: 80000 },
    { label: "10만원 이상", value: 100000 },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex flex-col items-start w-full px-6 pt-4 pb-8"
      >
        <h1 className="text-2xl font-bold text-slate-900 mb-8">
          월 요금
        </h1>

        <div className="w-full">
          <div className="min-h-[60px] flex items-center border-b-2 border-slate-300">
            <span className="text-4xl font-bold text-slate-900">
              {value ? formatNumber(value) : ""}
            </span>
            <span className="text-2xl font-medium text-slate-500 ml-2">
              {value ? "/월" : "월 요금 입력"}
            </span>
          </div>
          <p className="text-md text-slate-400 mt-2">현재 내고 계신 월 요금을 입력해주세요</p>

          {/* 정확히는 몰라요 체크박스 */}
          <div className="mt-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dontKnow}
                onChange={(e) => handleCheckboxChange(e.target.checked)}
                className="w-5 h-5 text-[#3182F6] border-slate-300 rounded focus:ring-[#3182F6] cursor-pointer"
              />
              <span className="ml-3 text-base text-slate-600">정확히는 몰라요</span>
            </label>
          </div>
        </div>

        {/* 키패드 + 완료 버튼 공간 확보 */}
        <div className="h-80" />
      </motion.div>

      {/* 완료 버튼 */}
      <AnimatePresence>
        {value && parseInt(value) > 0 && !dontKnow && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-72 left-0 right-0 px-6 z-20"
          >
            <button
              onClick={handleComplete}
              className="w-full max-w-sm mx-auto block h-14 bg-[#3182F6] hover:bg-[#2272e6] active:bg-[#1b62d6] text-white font-bold text-lg rounded-xl shadow-lg transition-colors"
            >
              완료
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 금액 범위 선택 바텀시트 */}
      <AnimatePresence>
        {showRangeOptions && (
          <>
            {/* 어두운 배경 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowRangeOptions(false);
                setDontKnow(false);
              }}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* 바텀시트 카드 */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50"
            >
              <div className="px-6 py-8 pb-12">
                {/* 핸들 바 */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-1 bg-slate-300 rounded-full" />
                </div>

                <p className="text-lg font-bold text-slate-900 mb-6 text-center">
                  정확하지 않아도 괜찮아요
                </p>

                {/* 세로 리스트 */}
                <div className="flex flex-col gap-3">
                  {rangeOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRangeSelect(option.value)}
                      className="w-full py-4 px-6 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 rounded-xl transition-colors text-center"
                    >
                      <span className="text-lg font-semibold text-slate-800">
                        {option.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {!dontKnow && (
        <NumberKeypad onNumberClick={handleNumberClick} onDelete={handleDelete} />
      )}
    </>
  );
}
