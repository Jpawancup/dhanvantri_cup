"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import ReelPlayer from "@/components/social/ReelPlayer"
import { Heart, Stethoscope, Laugh, Newspaper, Flame, Dumbbell } from "lucide-react"
import { useState } from "react"

const categories = [
  { label: "Health", icon: Heart },
  { label: "Doctors", icon: Stethoscope },
  { label: "Fitness", icon: Dumbbell },
  { label: "Trending", icon: Flame },
  { label: "News", icon: Newspaper },
  { label: "Comedy", icon: Laugh },
]

export default function ClipsPage() {
  const [activeCategory, setActiveCategory] = useState("Health")

  return (
    <DashboardLayout>
      <div className="bg-black min-h-screen relative">
        {/* Category filter bar */}
        <div className="sticky top-16 z-30 px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide bg-gradient-to-b from-black/90 to-transparent">
          {categories.map((c) => (
            <button
              key={c.label}
              onClick={() => setActiveCategory(c.label)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold flex-shrink-0 transition-all ${activeCategory === c.label ? "bg-medical-green text-white shadow-lg shadow-medical-green/30" : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/10"}`}
            >
              <c.icon className="w-3.5 h-3.5" /> {c.label}
            </button>
          ))}
        </div>

        {/* Reel Feed */}
        <div className="flex flex-col items-center gap-6 px-4 pb-24 pt-2">
          <ReelPlayer />
          <ReelPlayer />
          <ReelPlayer />
        </div>
      </div>
    </DashboardLayout>
  )
}

