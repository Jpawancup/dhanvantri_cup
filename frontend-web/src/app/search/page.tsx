"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Search as SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function SearchPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <SearchIcon className="w-6 h-6 text-medical-green" /> Search
        </h1>
        
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input className="pl-12 py-6 rounded-full bg-white shadow-sm text-lg" placeholder="Search for doctors, hospitals, specializations..." />
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 text-center py-20 text-muted-foreground">
          <p className="text-lg">Start typing to search across the Dhanvantri ecosystem.</p>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
