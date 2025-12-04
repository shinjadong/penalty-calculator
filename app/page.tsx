"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Step1Company } from "@/components/steps/Step1Company";
import { Step2MonthlyFee } from "@/components/steps/Step2MonthlyFee";
import { Step3Period } from "@/components/steps/Step3Period";
import { Step4Result } from "@/components/steps/Step4Result";
import { Step5HasCCTV } from "@/components/steps/Step5HasCCTV";
import { Step6CCTVCount } from "@/components/steps/Step6CCTVCount";
import { Step7ExemptionResult } from "@/components/steps/Step7ExemptionResult";

/**
 * 위약금 계산기 메인 페이지
 * 
 * 💡 전체 플로우 비유:
 * 마치 건강검진처럼 단계별로 정보를 수집해요!
 * 
 * Step 1: 어느 병원(보안업체) 이용 중이세요?
 * Step 2: 월 치료비(납입금)는 얼마예요?
 * Step 3: 남은 치료 기간(계약)은요?
 * Step 4: 현재 상태(위약금) 진단 결과!
 * Step 5: 기존 건강식품(CCTV)이 있나요?
 * Step 6: 몇 개나 드시고 계세요?
 * Step 7: 축하합니다! 할인(면제) 혜택 확정!
 */
type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default function Home() {
  // 기본 상태
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [company, setCompany] = useState<"에스원" | "캡스" | null>(null);
  const [monthlyFee, setMonthlyFee] = useState<number>(0);
  const [remainingMonths, setRemainingMonths] = useState<number>(0);
  
  // 면제 확인용 상태
  const [hasCCTV, setHasCCTV] = useState<boolean>(false);
  const [outdoorCount, setOutdoorCount] = useState<number>(0);
  const [indoorCount, setIndoorCount] = useState<number>(0);

  // Step 1: 회사 선택
  const handleCompanySelect = (selectedCompany: "에스원" | "캡스") => {
    setCompany(selectedCompany);
    setCurrentStep(2);
  };

  // Step 2: 월 납입금 입력
  const handleMonthlyFeeNext = (amount: number) => {
    setMonthlyFee(amount);
    setCurrentStep(3);
  };

  // Step 3: 남은 기간 입력
  const handlePeriodNext = (months: number) => {
    setRemainingMonths(months);
    setCurrentStep(4);
  };

  // Step 4: 면제 대상 확인 버튼
  const handleCheckExemption = () => {
    setCurrentStep(5);
  };

  // Step 5: CCTV 설치 여부 선택
  const handleHasCCTVSelect = (hasCCTVValue: boolean) => {
    setHasCCTV(hasCCTVValue);
    if (hasCCTVValue) {
      // CCTV가 있으면 대수 입력으로
      setCurrentStep(6);
    } else {
      // CCTV가 없으면 바로 결과 (면제 금액 0)
      setOutdoorCount(0);
      setIndoorCount(0);
      setCurrentStep(7);
    }
  };

  // Step 6: CCTV 대수 입력
  const handleCCTVCountNext = (outdoor: number, indoor: number) => {
    setOutdoorCount(outdoor);
    setIndoorCount(indoor);
    setCurrentStep(7);
  };

  // 뒤로가기
  const handleBack = () => {
    if (currentStep > 1) {
      // Step 7에서 뒤로가면 CCTV 유무에 따라 분기
      if (currentStep === 7) {
        if (hasCCTV) {
          setCurrentStep(6);
        } else {
          setCurrentStep(5);
        }
      } else {
        setCurrentStep((prev) => (prev - 1) as Step);
      }
    }
  };

  // 위약금 계산
  const calculatePenalty = () => {
    if (company === "에스원") {
      // 에스원: 남은 납입금의 80%
      return Math.floor(monthlyFee * remainingMonths * 0.8);
    } else {
      // 캡스: 남은 납입금의 10%
      return Math.floor(monthlyFee * remainingMonths * 0.1);
    }
  };

  // 면제 금액 계산
  // 💡 계산 로직: CCTV 1대당 일정 금액 면제 (실외: 더 높은 면제)
  const calculateExemption = () => {
    const penalty = calculatePenalty();
    
    if (!hasCCTV || (outdoorCount === 0 && indoorCount === 0)) {
      return 0;
    }

    // 실외 CCTV 1대당 50,000원, 실내 1대당 30,000원 면제
    // 최대 위약금의 100%까지 면제 가능
    const exemption = (outdoorCount * 50000) + (indoorCount * 30000);
    
    // 위약금보다 면제금액이 클 수 없음
    return Math.min(exemption, penalty);
  };

  // 헤더 표시 여부 (Step 4, 7 제외)
  const showHeader = currentStep > 1 && currentStep !== 4 && currentStep !== 7;

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Header with Back Button */}
      {showHeader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-slate-100 z-10"
        >
          <button
            onClick={handleBack}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>
        </motion.div>
      )}

      {/* Content Area */}
      <div className="flex-1 flex items-start justify-center pt-14">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <Step1Company key="step1" onSelect={handleCompanySelect} />
            )}
            {currentStep === 2 && (
              <Step2MonthlyFee key="step2" onNext={handleMonthlyFeeNext} />
            )}
            {currentStep === 3 && (
              <Step3Period key="step3" onNext={handlePeriodNext} monthlyFee={monthlyFee} />
            )}
            {currentStep === 4 && (
              <Step4Result 
                key="step4" 
                penalty={calculatePenalty()} 
                company={company} 
                onNext={handleCheckExemption}
              />
            )}
            {currentStep === 5 && (
              <Step5HasCCTV key="step5" onSelect={handleHasCCTVSelect} />
            )}
            {currentStep === 6 && (
              <Step6CCTVCount key="step6" onNext={handleCCTVCountNext} />
            )}
            {currentStep === 7 && (
              <Step7ExemptionResult 
                key="step7" 
                penalty={calculatePenalty()} 
                exemptionAmount={calculateExemption()}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
