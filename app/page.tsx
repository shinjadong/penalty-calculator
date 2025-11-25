"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Step1Company } from "@/components/steps/Step1Company";
import { Step2MonthlyFee } from "@/components/steps/Step2MonthlyFee";
import { Step3Period } from "@/components/steps/Step3Period";
import { Step4Result } from "@/components/steps/Step4Result";

type Step = 1 | 2 | 3 | 4;

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [company, setCompany] = useState<"에스원" | "캡스" | null>(null);
  const [monthlyFee, setMonthlyFee] = useState<number>(0);
  const [remainingMonths, setRemainingMonths] = useState<number>(0);

  const handleCompanySelect = (selectedCompany: "에스원" | "캡스") => {
    setCompany(selectedCompany);
    setCurrentStep(2);
  };

  const handleMonthlyFeeNext = (amount: number) => {
    setMonthlyFee(amount);
    setCurrentStep(3);
  };

  const handlePeriodNext = (months: number) => {
    setRemainingMonths(months);
    setCurrentStep(4);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const calculatePenalty = () => {
    if (company === "에스원") {
      // 에스원: 남은 납입금의 80%
      return Math.floor(monthlyFee * remainingMonths * 0.8);
    } else {
      // 캡스: 남은 납입금의 10%
      return Math.floor(monthlyFee * remainingMonths * 0.1);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Header with Back Button */}
      {currentStep > 1 && currentStep < 4 && (
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
              <Step4Result key="step4" penalty={calculatePenalty()} company={company} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
