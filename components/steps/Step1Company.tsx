"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
        사용중인 보안서비스
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
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50"
            >
              <div className="px-6 py-8 pb-12">
                {/* 핸들 바 */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-1 bg-slate-300 rounded-full" />
                </div>

                <p className="text-lg font-bold text-slate-900 mb-6 text-center">
                  업체명을 선택해주세요
                </p>

                {/* 가로 2개 그리드 */}
                <div className="grid grid-cols-2 gap-4">
                  {/* 에스원 카드 */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect("에스원")}
                    className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 rounded-2xl transition-colors aspect-square"
                  >
                    {/* 로고 영역 */}
                    <div className="w-20 h-20 mb-4 bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden">
                      <Image
                        src="https://img.hankyung.com/photo/202303/01.26756518.1.jpg"
                        alt="에스원 로고"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    {/* 업체명 */}
                    <span className="text-base font-semibold text-slate-800">
                      에스원
                    </span>
                  </motion.button>

                  {/* 캡스 카드 */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect("캡스")}
                    className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 rounded-2xl transition-colors aspect-square"
                  >
                    {/* 로고 영역 */}
                    <div className="w-20 h-20 mb-4 bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden">
                      <Image
                        src="https://www.boannews.com/media/upFiles/adt_1_.jpg"
                        alt="캡스 로고"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    {/* 업체명 */}
                    <span className="text-base font-semibold text-slate-800">
                      캡스
                    </span>
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
