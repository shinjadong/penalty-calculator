"use client";

import { motion } from "framer-motion";

interface Step5HasCCTVProps {
  onSelect: (hasCCTV: boolean) => void;
}

/**
 * Step5HasCCTV - CCTV 설치 여부를 묻는 컴포넌트
 * 
 * 💡 비유: 마치 병원에서 "기존 병력이 있으신가요?"라고 묻는 것처럼,
 * 고객이 이미 CCTV를 가지고 있는지 확인하는 단계예요.
 * 이 정보가 있어야 면제 혜택을 계산할 수 있어요!
 */
export function Step5HasCCTV({ onSelect }: Step5HasCCTVProps) {
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
        className="mb-12"
      >
        <h1 className="text-2xl font-bold text-slate-900 leading-tight">
          설치 되어있는
          <br />
          CCTV가 있나요?
        </h1>
        <p className="text-base text-slate-500 mt-3">
          기존 CCTV가 있다면 추가 혜택이 있어요
        </p>
      </motion.div>

      {/* 선택 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full space-y-4"
      >
        {/* 네 버튼 */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(true)}
          className="w-full h-16 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 
                     rounded-2xl text-lg font-semibold text-slate-800 
                     transition-colors border-2 border-transparent hover:border-[#3182F6]"
        >
          네, 있어요
        </motion.button>

        {/* 아니요 버튼 */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(false)}
          className="w-full h-16 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 
                     rounded-2xl text-lg font-semibold text-slate-800 
                     transition-colors border-2 border-transparent hover:border-[#3182F6]"
        >
          아니요, 없어요
        </motion.button>
      </motion.div>
    </motion.div>
  );
}



