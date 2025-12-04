"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

interface Step4ResultProps {
  penalty: number;
  company: "에스원" | "캡스" | null;
  onNext: () => void;  // 다음 스텝(면제 확인)으로 이동
}

/**
 * Step4Result - 위약금 계산 결과를 보여주는 컴포넌트
 * 
 * 💡 비유: 마트에서 장바구니에 물건을 담고 "총 금액"을 확인하는 단계예요.
 * 여기서 "면제 대상 확인" 버튼을 누르면 할인 쿠폰(면제 혜택)을 적용하러 가는 거죠!
 */
export function Step4Result({ penalty, company, onNext }: Step4ResultProps) {
  const springValue = useSpring(0, { bounce: 0, duration: 1500 });
  const displayValue = useTransform(springValue, (value) =>
    Math.floor(value).toLocaleString("ko-KR")
  );

  useEffect(() => {
    springValue.set(penalty);
  }, [penalty, springValue]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-start w-full px-6 pt-4 pb-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-8 w-full"
      >
        <p className="text-lg font-medium text-slate-500 mb-2">
          고객님의 남은 위약금은
        </p>
        <div className="flex items-baseline gap-1">
          <motion.span className="text-5xl font-black text-slate-900 tracking-tight">
            {displayValue}
          </motion.span>
          <span className="text-3xl font-bold text-slate-900">원</span>
        </div>
        <p className="text-xl font-semibold text-slate-700 mt-2">
          이에요!
        </p>
      </motion.div>

      {/* 이미지 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="w-11/12 max-w-md mx-auto mb-24 mt-12 aspect-square relative flex items-center justify-center overflow-hidden rounded-3xl shadow-lg"
      >
        <Image
          src="https://aet4p1ka2mfpbmiq.public.blob.vercel-storage.com/%ED%83%88%EC%B6%9C%ED%94%8C%EB%9E%9C02.png"
          alt="KT 안심탈출 플랜"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* 고정된 하단 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="fixed bottom-0 left-0 right-0 px-6 pb-8 bg-white"
      >
        <button
          onClick={onNext}
          className="w-full h-14 bg-[#3182F6] hover:bg-[#2272e6] active:bg-[#1b62d6] text-white font-bold text-lg rounded-xl shadow-lg transition-colors mb-4"
        >
          면제 대상 확인
        </button>
        <p className="text-xs text-slate-400 text-center">
          * 공식적으로 소개된 위약금율에 기반한 결과입니다. <br /> 이는 법적 효과가 없음을 알려드립니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
