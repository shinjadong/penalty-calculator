"use client";

import { motion } from "framer-motion";
import { Delete } from "lucide-react";

interface NumberKeypadProps {
  onNumberClick: (num: string) => void;
  onDelete: () => void;
}

export function NumberKeypad({ onNumberClick, onDelete }: NumberKeypadProps) {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0"];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4 pb-safe">
      <div className="grid grid-cols-3 gap-3 w-full max-w-sm mx-auto">
        {numbers.map((num) => (
          <motion.button
            key={num}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNumberClick(num)}
            className="h-14 text-2xl font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 rounded-xl transition-colors"
          >
            {num}
          </motion.button>
        ))}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onDelete}
          className="h-14 flex items-center justify-center bg-slate-50 hover:bg-slate-100 active:bg-slate-200 rounded-xl transition-colors"
        >
          <Delete className="w-6 h-6 text-slate-600" />
        </motion.button>
      </div>
    </div>
  );
}
