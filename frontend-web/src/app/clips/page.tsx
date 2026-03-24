"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import ReelPlayer from "@/components/social/ReelPlayer"

const categories = ["All", "Health", "Doctors", "Fitness", "Trending", "News", "Comedy"]

export default function ClipsPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    // Full-screen black reel experience — no layout wrapper needed
    // We use a standalone fullscreen page for immersive viewing
    <div className="fixed inset-0 bg-black z-[100] flex flex-col">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-safe-or-4">
        <div className="flex items-center gap-3 pt-3">
          <Link href="/dashboard">
            <button className="w-9 h-9 bg-black/40 backdrop-blur rounded-full flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </Link>
          <span className="text-white font-black text-lg tracking-tight">Reels</span>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1 ml-4 pb-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all mt-3 ${
                activeCategory === c
                  ? "bg-medical-green text-white shadow-lg"
                  : "bg-white/10 text-white/60 border border-white/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Full-screen Reel Player */}
      <div className="flex-1 w-full">
        <ReelPlayer />
      </div>
    </div>
  )
}
