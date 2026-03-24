"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FeedPost from "@/components/social/FeedPost"
import { motion } from "framer-motion"

export default function FeedSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const categories = ["All", "Health", "Tips", "Research", "Surgery", "Dental", "Fitness", "Mental Health"]

  return (
    <div className="w-full h-full bg-white rounded-2xl border border-medical-grey/60 shadow-sm overflow-hidden">
      <Tabs defaultValue="foryou" className="w-full border-b-0">
        <div className="sticky top-[64px] z-30 bg-white border-b overflow-hidden shadow-sm">
          <TabsList className="grid w-full max-w-sm grid-cols-2 mx-auto bg-medical-grey my-3">
            <TabsTrigger value="foryou" className="data-[state=active]:bg-white data-[state=active]:text-medical-green rounded-md font-semibold">
              For You
            </TabsTrigger>
            <TabsTrigger value="following" className="data-[state=active]:bg-white data-[state=active]:text-medical-green rounded-md font-semibold">
              Following
            </TabsTrigger>
          </TabsList>

          {/* Categories Horizontal Scroll */}
          <div className="flex gap-2 p-3 pt-0 overflow-x-auto no-scrollbar mask-fade">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? "bg-medical-green text-white shadow-md shadow-medical-green/20" 
                    : "bg-medical-grey text-muted-foreground hover:bg-medical-grey/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <TabsContent value="foryou" className="w-full px-2 py-4 focus-visible:outline-none focus:outline-none mt-2">
          <FeedPost />
          <FeedPost />
          <FeedPost />
        </TabsContent>
        
        <TabsContent value="following" className="w-full px-2 py-4 focus-visible:outline-none mt-2">
          <div className="text-center py-10 text-muted-foreground">
            <h3 className="font-semibold text-foreground mb-2">You\'re all caught up!</h3>
            <p className="text-sm">Follow more doctors and hospitals to see their posts here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
