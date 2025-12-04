"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { PartyPopper } from "lucide-react";

interface Step7ExemptionResultProps {
  penalty: number;           // 원래 위약금
  exemptionAmount: number;   // 면제 금액
}

/**
 * Step7ExemptionResult - 면제 결과를 보여주는 컴포넌트
 * 
 * 💡 비유: 마치 쇼핑몰에서 쿠폰을 적용한 후 "얼마나 할인받았는지" 보여주는 화면처럼,
 * 고객이 얼마나 혜택을 받을 수 있는지 임팩트 있게 보여주는 최종 결과 화면이에요.
 * 숫자가 올라가는 애니메이션으로 성취감을 더해줍니다!
 */
export function Step7ExemptionResult({ penalty, exemptionAmount }: Step7ExemptionResultProps) {
  // 면제 금액 애니메이션
  const springExemption = useSpring(0, { bounce: 0, duration: 1500 });
  const displayExemption = useTransform(springExemption, (value) =>
    Math.floor(value).toLocaleString("ko-KR")
  );

  // 원래 위약금 애니메이션
  const springPenalty = useSpring(0, { bounce: 0, duration: 1200 });
  const displayPenalty = useTransform(springPenalty, (value) =>
    Math.floor(value).toLocaleString("ko-KR")
  );

  useEffect(() => {
    // 약간의 딜레이 후 애니메이션 시작
    const timer = setTimeout(() => {
      springPenalty.set(penalty);
      springExemption.set(exemptionAmount);
    }, 500);
    return () => clearTimeout(timer);
  }, [penalty, exemptionAmount, springPenalty, springExemption]);

  const handleApply = () => {
    // 신청 페이지로 이동
    window.location.href = "https://kt-cctv.ai.kr/";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center w-full px-6 pt-4 pb-8"
    >
      {/* 축하 아이콘 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6"
      >
        <div className="w-20 h-20 bg-[#3182F6]/10 rounded-full flex items-center justify-center">
          <PartyPopper className="w-10 h-10 text-[#3182F6]" />
        </div>
      </motion.div>

      {/* 축하 메시지 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-black text-slate-900 mb-2">
          축하합니다!
        </h1>
        <p className="text-lg text-slate-600">
          고객님은 면제 대상이에요
        </p>
      </motion.div>

      {/* 금액 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="w-full bg-gradient-to-br from-[#3182F6] to-[#1b62d6] rounded-3xl p-6 mb-6 shadow-xl"
      >
        {/* 원래 위약금 */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/20">
          <span className="text-white/80 font-medium">위약금</span>
          <div className="flex items-baseline gap-1">
            <motion.span className="text-xl font-bold text-white/90">
              {displayPenalty}
            </motion.span>
            <span className="text-white/70">원</span>
          </div>
        </div>

        {/* 면제 금액 - 강조 */}
        <div className="flex justify-between items-center">
          <span className="text-white font-bold text-lg">면제 금액</span>
          <div className="flex items-baseline gap-1">
            <motion.span className="text-4xl font-black text-white tracking-tight">
              {displayExemption}
            </motion.span>
            <span className="text-xl font-bold text-white">원</span>
          </div>
        </div>
      </motion.div>

      {/* 요약 메시지 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="text-center text-slate-600 mb-24 leading-relaxed"
      >
        위약금 <span className="font-bold text-slate-800">{penalty.toLocaleString()}원</span> 중
        <br />
        <span className="font-black text-[#3182F6] text-xl">{exemptionAmount.toLocaleString()}원</span>을
        <br />
        면제 받으실 수 있어요!
      </motion.p>

      {/* 신청 버튼 - 고정 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="fixed bottom-0 left-0 right-0 px-6 pb-8 bg-white"
      >
        <button
          onClick={handleApply}
          className="w-full h-14 bg-[#3182F6] hover:bg-[#2272e6] active:bg-[#1b62d6] 
                     text-white font-bold text-lg rounded-xl shadow-lg transition-colors mb-3"
        >
          신청 현황 알아보기
        </button>
        <p className="text-xs text-slate-400 text-center">
          * 실제 면제 금액은 상담 후 확정됩니다.
        </p>
      </motion.div>
    </motion.div>
  );
}

