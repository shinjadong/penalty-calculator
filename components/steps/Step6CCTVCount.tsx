"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface Step6CCTVCountProps {
  onNext: (outdoorCount: number, indoorCount: number) => void;
}

/**
 * Step6CCTVCount - CCTV 대수를 입력받는 컴포넌트
 * 
 * 💡 비유: 마치 이사할 때 "짐이 몇 박스나 되세요?"라고 묻는 것처럼,
 * 정확한 견적(면제 금액)을 계산하기 위해 CCTV 대수를 확인하는 단계예요.
 * 실외와 실내를 구분하는 이유는 설치 환경에 따라 가치가 다르기 때문이에요!
 */
export function Step6CCTVCount({ onNext }: Step6CCTVCountProps) {
  const [outdoorCount, setOutdoorCount] = useState(1);
  const [indoorCount, setIndoorCount] = useState(0);

  const totalCount = outdoorCount + indoorCount;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-start w-full px-6 pt-4 pb-8 min-h-[80vh]"
    >
      {/* 질문 제목 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-10"
      >
        <h1 className="text-2xl font-bold text-slate-900 leading-tight">
          어디에 몇 대
          <br />
          있나요?
        </h1>
        <p className="text-base text-slate-500 mt-3">
          대략적인 수량만 알려주셔도 돼요
        </p>
      </motion.div>

      {/* 대수 선택 카드들 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full space-y-4 mb-8"
      >
        {/* 실외 카드 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-slate-900">실외</h4>
              <p className="text-sm text-slate-500">건물 외부, 주차장 등</p>
            </div>
            <div className="flex items-center gap-4">
              {/* 마이너스 버튼 */}
              <button
                type="button"
                onClick={() => setOutdoorCount((prev) => Math.max(0, prev - 1))}
                className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 
                           flex items-center justify-center text-slate-700 
                           transition-colors active:scale-95"
              >
                <Minus className="w-5 h-5" />
              </button>
              
              {/* 숫자 표시 */}
              <span className="w-8 text-center text-xl font-bold text-slate-900">
                {outdoorCount}
              </span>
              
              {/* 플러스 버튼 */}
              <button
                type="button"
                onClick={() => setOutdoorCount((prev) => Math.min(99, prev + 1))}
                className="w-11 h-11 rounded-xl bg-[#3182F6] hover:bg-[#2272e6] 
                           flex items-center justify-center text-white 
                           transition-colors active:scale-95"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 실내 카드 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-slate-900">실내</h4>
              <p className="text-sm text-slate-500">사무실, 매장 내부 등</p>
            </div>
            <div className="flex items-center gap-4">
              {/* 마이너스 버튼 */}
              <button
                type="button"
                onClick={() => setIndoorCount((prev) => Math.max(0, prev - 1))}
                className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 
                           flex items-center justify-center text-slate-700 
                           transition-colors active:scale-95"
              >
                <Minus className="w-5 h-5" />
              </button>
              
              {/* 숫자 표시 */}
              <span className="w-8 text-center text-xl font-bold text-slate-900">
                {indoorCount}
              </span>
              
              {/* 플러스 버튼 */}
              <button
                type="button"
                onClick={() => setIndoorCount((prev) => Math.min(99, prev + 1))}
                className="w-11 h-11 rounded-xl bg-[#3182F6] hover:bg-[#2272e6] 
                           flex items-center justify-center text-white 
                           transition-colors active:scale-95"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 총 대수 표시 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full text-center mb-8"
      >
        <p className="text-slate-500">
          총 <span className="font-bold text-[#3182F6]">{totalCount}</span>대
        </p>
      </motion.div>

      {/* 다음 버튼 - 고정 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-0 left-0 right-0 px-6 pb-8 bg-white"
      >
        <button
          onClick={() => onNext(outdoorCount, indoorCount)}
          disabled={totalCount === 0}
          className="w-full h-14 bg-[#3182F6] hover:bg-[#2272e6] active:bg-[#1b62d6] 
                     disabled:bg-slate-300 disabled:cursor-not-allowed
                     text-white font-bold text-lg rounded-xl shadow-lg transition-colors"
        >
          다음
        </button>
      </motion.div>
    </motion.div>
  );
}



