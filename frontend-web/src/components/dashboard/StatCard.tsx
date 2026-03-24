"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface StatCardProps {
  label: string
  value: string | number
  icon: ReactNode
  color: string
  subtitle?: string
}

export function StatCard({ label, value, icon, color, subtitle }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-2xl shadow-sm p-3 md:p-5 flex flex-col md:flex-row items-start gap-2 md:gap-4 border border-medical-grey/60 cursor-pointer"
    >
      <div className={`${color} rounded-xl p-2 md:p-3 flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-xs md:text-sm text-muted-foreground font-medium md:mb-0.5 tracking-tight">{label}</p>
        <p className="text-xl md:text-2xl font-bold leading-none">{value}</p>
        {subtitle && <p className="text-[10px] md:text-xs text-medical-green mt-1 font-bold uppercase tracking-widest">{subtitle}</p>}
      </div>
    </motion.div>
  )
}
