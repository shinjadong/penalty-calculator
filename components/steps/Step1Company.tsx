"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step1CompanyProps {
  onSelect: (company: "에스원" | "캡스") => void;
}

export function Step1Company({ onSelect }: Step1CompanyProps) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-start w-full px-6 pt-4 pb-8 min-h-[80vh]"
    >
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        어떤 CCTV 쓰시나요?
      </h1>

      {!showOptions && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mt-6"
        >
          <button
            onClick={() => setShowOptions(true)}
            className="w-full min-h-[60px] flex items-center border-b-2 border-slate-300 text-left transition-all hover:border-slate-400"
          >
            <span className="text-2xl font-medium text-slate-400">선택하기</span>
          </button>
          <p className="text-xs text-slate-400 mt-3">
            선택하기를 눌러 업체를 선택해주세요.
          </p>
        </motion.div>
      )}

      {/* 오버레이 배경 */}
      <AnimatePresence>
        {showOptions && (
          <>
            {/* 어두운 배경 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOptions(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* 바텀시트 카드 */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 pb-safe"
            >
              <div className="px-6 py-6">
                {/* 핸들 바 */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-1 bg-slate-300 rounded-full" />
                </div>



                <div className="space-y-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect("에스원")}
                    className="w-full h-14 px-6 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl font-semibold text-slate-800 transition-colors"
                  >
                    에스원
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect("캡스")}
                    className="w-full h-14 px-6 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl font-semibold text-slate-800 transition-colors"
                  >
                    캡스
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
