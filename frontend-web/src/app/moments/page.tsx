"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import StoryViewer from "@/components/social/StoryViewer"
import { stories } from "@/services/mockData"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MomentsPage() {
  return (
    <DashboardLayout>
      <div className="bg-white p-4 border-b flex items-center justify-between">
        <h1 className="text-xl font-bold">Moments</h1>
        <Button size="sm" className="bg-medical-pink hover:bg-medical-pink/90 text-foreground rounded-full px-4 gap-1.5 active:scale-95 transition-transform duration-200">
          <Plus className="w-4 h-4" /> Add Moment
        </Button>
      </div>

      {/* My Story */}
      <div className="bg-white border-b p-4">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Your Moments</h3>
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition-transform">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-medical-grey border-2 border-dashed border-medical-green flex items-center justify-center">
              <Plus className="w-6 h-6 md:w-7 md:h-7 text-medical-green" />
            </div>
            <span className="text-xs font-medium">Add</span>
          </div>
        </div>
      </div>

      {/* Friends' Stories */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">Recent Moments</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
          {[...stories, ...stories].map((s, idx) => (
            <div key={idx} className="relative cursor-pointer rounded-2xl overflow-hidden aspect-[9/16] bg-medical-grey shadow-sm group active:scale-95 transition-transform duration-200">
              <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-2 left-2">
                <div className="w-8 h-8 rounded-full border-2 border-medical-green overflow-hidden">
                  <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2">
                <p className="text-white text-xs font-semibold">{s.name}</p>
                <p className="text-white/60 text-[10px]">2h ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
