"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NumberKeypad } from "../NumberKeypad";

interface Step2MonthlyFeeProps {
  onNext: (amount: number) => void;
}

export function Step2MonthlyFee({ onNext }: Step2MonthlyFeeProps) {
  const [value, setValue] = useState("");

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

  const formatNumber = (num: string) => {
    if (!num) return "";
    return parseInt(num).toLocaleString("ko-KR");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex flex-col items-start w-full px-6 pt-4 pb-8"
      >
        <h1 className="text-2xl font-bold text-slate-900 mb-8">
          한달에 얼마씩 내고 있나요?
        </h1>

        <div className="w-full">
          <div className="min-h-[60px] flex items-center border-b-2 border-slate-300">
            <span className="text-4xl font-bold text-slate-900">
              {value ? formatNumber(value) : ""}
            </span>
            <span className="text-2xl font-medium text-slate-500 ml-2">
              {value ? "/월" : "월 납입금 입력"}
            </span>
          </div>
          <p className="text-md text-slate-400 mt-2">금액을 입력해주세요</p>
        </div>

        {/* 키패드 + 완료 버튼 공간 확보 */}
        <div className="h-80" />
      </motion.div>

      {/* 완료 버튼 */}
      <AnimatePresence>
        {value && parseInt(value) > 0 && (
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

      <NumberKeypad onNumberClick={handleNumberClick} onDelete={handleDelete} />
    </>
  );
}
