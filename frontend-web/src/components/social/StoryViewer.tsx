"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function StoryViewer() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeStory, setActiveStory] = useState(0)

  const stories = [
    { id: 1, user: "Dr. Patel", time: "4h", img: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, user: "Hospital Alpha", time: "2h", img: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2070&auto=format&fit=crop" },
    { id: 3, user: "MedNews", time: "1h", img: "https://images.unsplash.com/photo-1505751172107-160a283b9cfc?q=80&w=2070&auto=format&fit=crop" },
  ]

  const nextStory = () => {
    if (activeStory < stories.length - 1) {
      setActiveStory(activeStory + 1)
    } else {
      setIsOpen(false)
      setActiveStory(0)
    }
  }

  if (!isOpen) return (
    <div onClick={() => setIsOpen(true)} className="flex flex-col items-center gap-1 cursor-pointer w-20 flex-shrink-0 group">
      <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-medical-blue via-medical-green to-medical-green shadow-sm group-hover:scale-110 transition-transform">
        <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white">
          <img 
            src="https://images.unsplash.com/photo-1594824436998-d8906bd30114?q=80&w=2070&auto=format&fit=crop" 
            alt="Story Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs font-semibold mt-1 group-hover:text-medical-green transition-colors">Dr. Patel</span>
    </div>
  )

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm"
      >
        <div className="relative w-full max-w-sm h-[85vh] bg-zinc-900 rounded-2xl overflow-hidden md:h-[800px] border border-zinc-800 shadow-2xl">
          {/* Progress Bar Container */}
          <div className="absolute top-2 left-0 right-0 z-10 px-2 flex gap-1">
            {stories.map((story, i) => (
              <div key={story.id} className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden">
                {i === activeStory && (
                   <motion.div 
                     className="h-full bg-white rounded-full text-white drop-shadow-md"
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 5, ease: "linear" }}
                     onAnimationComplete={nextStory}
                   />
                )}
                {i < activeStory && <div className="h-full bg-white rounded-full w-full" />}
              </div>
            ))}
          </div>

          <div className="absolute top-6 left-4 z-10 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-medical-green border border-white/40 shadow-sm" />
            <span className="text-sm font-semibold text-white drop-shadow-md">{stories[activeStory].user}</span>
            <span className="text-xs text-white/70 drop-shadow-md ml-1">{stories[activeStory].time}</span>
          </div>

          <button onClick={() => setIsOpen(false)} className="absolute top-5 right-4 z-10 p-1 bg-black/20 hover:bg-black/50 rounded-full text-white backdrop-blur-md transition-colors">
            <X className="w-5 h-5" />
          </button>

          <motion.img 
            key={stories[activeStory].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={stories[activeStory].img} 
            className="w-full h-full object-cover"
            alt="Story Content"
            onClick={nextStory}
          />

          <div className="absolute bottom-6 left-4 right-4 z-10 flex gap-2 items-center">
            <Input 
              placeholder="Send message..." 
              className="bg-black/40 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-medical-green rounded-full backdrop-blur-md"
            />
            <button className="bg-medical-green hover:bg-medical-green/90 p-2.5 rounded-full text-white transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
