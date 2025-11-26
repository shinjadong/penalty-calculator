"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { NumberKeypad } from "../NumberKeypad";

interface Step3PeriodProps {
  onNext: (months: number) => void;
  monthlyFee: number;
}

export function Step3Period({ onNext, monthlyFee }: Step3PeriodProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unit, setUnit] = useState<"년" | "개월">("개월");
  const [value, setValue] = useState("");

  const handleNumberClick = (num: string) => {
    setValue((prev) => prev + num);
  };

  const handleDelete = () => {
    setValue((prev) => prev.slice(0, -1));
  };

  const handleUnitSelect = (selectedUnit: "년" | "개월") => {
    setUnit(selectedUnit);
    setIsDropdownOpen(false);
  };

  const handleComplete = () => {
    if (value && parseInt(value) > 0) {
      const months = unit === "년" ? parseInt(value) * 12 : parseInt(value);
      onNext(months);
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
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            남은 약정 기간
          </h1>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mb-4 bg-white border rounded-lg shadow-lg overflow-hidden z-10"
          >
            <button
              onClick={() => handleUnitSelect("년")}
              className={`w-full px-4 py-3 text-left hover:bg-slate-50 ${
                unit === "년" ? "bg-blue-50 text-blue-600 font-semibold" : ""
              }`}
            >
              년
            </button>
            <button
              onClick={() => handleUnitSelect("개월")}
              className={`w-full px-4 py-3 text-left hover:bg-slate-50 ${
                unit === "개월" ? "bg-blue-50 text-blue-600 font-semibold" : ""
              }`}
            >
              개월
            </button>
          </motion.div>
        )}

        <div className="w-full">
          <div className="text-xs text-slate-400 mb-3">
            월 납입금 {monthlyFee.toLocaleString("ko-KR")}원
          </div>

          <p className="text-sm font-semibold text-slate-700 mb-4">
            개월수를 입력해주세요
          </p>

          <div className="min-h-[60px] flex items-center border-b-2 border-slate-300">
            <span className="text-4xl font-bold text-slate-900">
              {value ? formatNumber(value) : ""}
            </span>
            <span className="text-2xl font-medium text-slate-500 ml-2">
              {value ? `/${unit}` : "개월수 입력"}
            </span>
          </div>
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
