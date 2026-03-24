"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Share2, MoreVertical, Play, Pause } from "lucide-react"

export default function ReelPlayer() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [liked, setLiked] = useState(false)
  const [followed, setFollowed] = useState(false)
  const [activeReelIndex, setActiveReelIndex] = useState(0)
  
  const reels = [
    { id: 1, title: "Cholesterol Risks", doctor: "Dr. Raj Patel", likes: "45k", comments: "831" },
    { id: 2, title: "Sugar & Insulin", doctor: "Dr. Anjali Desai", likes: "12k", comments: "412" },
    { id: 3, title: "Stress Management", doctor: "Dr. Vikram Seth", likes: "33k", comments: "211" },
  ]

  const nextReel = () => setActiveReelIndex((prev) => (prev + 1) % reels.length)
  const activeReel = reels[activeReelIndex]

  return (
    <div className="relative w-full h-[80vh] bg-black rounded-xl overflow-hidden shadow-xl mx-auto flex items-center justify-center">
      {/* Video Placeholder */}
      <div 
        className="w-full h-full object-cover flex items-center justify-center bg-zinc-800"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <span className="text-zinc-500 font-medium">Reel Video Placeholder</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isPlaying ? 0 : 1, scale: isPlaying ? 0.8 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-black/50 p-4 rounded-full text-white pointer-events-auto cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
            <Play className="w-10 h-10 fill-current" />
          </div>
        </motion.div>
      </div>

      <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center">
        <button className="flex flex-col items-center gap-1 group" onClick={() => setLiked(!liked)}>
          <motion.div 
            whileTap={{ scale: 0.8 }}
            className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-black/60 transition-colors"
          >
            <Heart className={`w-6 h-6 transition-all ${liked ? "fill-medical-red text-medical-red scale-110" : "text-white"}`} />
          </motion.div>
          <span className={`text-xs font-semibold drop-shadow-md transition-colors ${liked ? "text-medical-red" : "text-white"}`}>
            {activeReel.likes}
          </span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-black/60 transition-colors">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-semibold text-white drop-shadow-md">{activeReel.comments}</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-black/60 transition-colors">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-semibold text-white drop-shadow-md">Share</span>
        </button>

        <button className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center mt-2 group-hover:bg-black/60">
          <MoreVertical className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="absolute left-4 bottom-8 flex flex-col gap-3 pr-20">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"
            alt="Doctor profile"
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />
          <h4 className="font-semibold text-white text-md drop-shadow-md">{activeReel.doctor}</h4>
          <button 
            onClick={() => setFollowed(!followed)}
            className={`px-3 py-0.5 border rounded-md text-xs font-semibold backdrop-blur-md transition-all ${
              followed 
                ? "bg-white text-black border-white" 
                : "bg-white/10 text-white border-white hover:bg-white/30"
            }`}
          >
            {followed ? "Following" : "Follow"}
          </button>
        </div>
        <p className="text-white text-sm font-medium drop-shadow-md line-clamp-2">
          {activeReel.title} – Understanding healthcare through reels. What your test reports don't tell you. Watch till the end. 🏥
        </p>
        <button 
          onClick={nextReel}
          className="text-xs font-bold text-white/60 hover:text-white transition-colors underline underline-offset-4 w-fit"
        >
          Next Video ⬇
        </button>
      </div>
    </div>
  )
}
