"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { toast } from "sonner";

interface Step4ResultProps {
  penalty: number;
  company: "에스원" | "캡스" | null;
}

export function Step4Result({ penalty, company }: Step4ResultProps) {
  const springValue = useSpring(0, { bounce: 0, duration: 1500 });
  const displayValue = useTransform(springValue, (value) =>
    Math.floor(value).toLocaleString("ko-KR")
  );

  useEffect(() => {
    springValue.set(penalty);
  }, [penalty, springValue]);

  const handleExemption = () => {
    // 바로 외부 링크로 이동
    window.location.href = "https://kt-cctv.ai.kr/";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center w-full px-6 py-12 min-h-[70vh]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-black text-slate-900 mb-4">
          고객님!
          <br />
          남은 위약금이
        </h1>
        <div className="flex items-baseline justify-center">
          <motion.span className="text-6xl font-black text-red-600">
            {displayValue}
          </motion.span>
          <span className="text-3xl font-bold text-red-600 ml-2">원</span>
        </div>
        <p className="text-2xl font-black text-slate-900 mt-4">이에요!</p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleExemption}
        className="w-full max-w-sm h-14 bg-[#3182F6] hover:bg-[#2272e6] active:bg-[#1b62d6] text-white font-bold text-lg rounded-xl shadow-lg transition-colors"
      >
        면제 받아보기
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-xs text-slate-400 mt-4 text-center"
      >
        * {company === "에스원" ? "위약금율 80% (업계 평균)" : "위약금율 10%"} 가정 시 추정치입니다.
      </motion.p>
    </motion.div>
  );
}
