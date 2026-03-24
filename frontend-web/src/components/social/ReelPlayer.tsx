"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, MessageCircle, Share2, VolumeX, Volume2, Play, Pause, Bookmark } from "lucide-react"

// 13 real local reels (reel1.mp4 ... reel13.mp4)
const REELS = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  src: `/images/social/reels/reel${i + 1}.mp4`,
  doctor: ["Dr. Amit Sharma", "Dr. Anjali Desai", "Dr. Raj Patel", "Dr. Sunita Rao", "Dr. Vikram Nair", "Dr. Priya Mehta", "Dr. Suresh Gupta", "Dr. Nidhi Kapoor", "Dr. Arjun Singh", "Dr. Deepa Joshi", "Dr. Rohan Malhotra", "Dr. Kavita Pillai", "Dr. Farhan Sheikh"][i],
  specialty: ["Cardiologist", "Neurologist", "Orthopedic", "Gynecologist", "Dermatologist", "Pediatrician", "General Physician", "ENT Specialist", "Psychiatrist", "Endocrinologist", "Oncologist", "Ophthalmologist", "Pulmonologist"][i],
  title: ["5 Signs of Heart Disease", "Sleep & Brain Health", "Posture at Desk", "Hormonal Balance Tips", "Skin Care Myths Debunked", "Child Nutrition Guide", "Fever Management", "Sinus Relief Techniques", "Mental Health Awareness", "Diabetes Management", "Cancer Early Detection", "Eye Exercise Routine", "Breathing Techniques"][i],
  likes: [45200, 12400, 33100, 28900, 19800, 42100, 8700, 15300, 67800, 23400, 31200, 11900, 27600][i],
  comments: [831, 412, 211, 378, 156, 523, 94, 203, 1204, 345, 487, 178, 392][i],
  avatar: `https://i.pravatar.cc/80?img=${i + 10}`,
}))

interface ReelItemProps {
  reel: typeof REELS[0]
  isActive: boolean
  muted: boolean
  onMuteToggle: () => void
}

function ReelItem({ reel, isActive, muted, onMuteToggle }: ReelItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(reel.likes)
  const [showHeartBurst, setShowHeartBurst] = useState(false)
  const lastTap = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isActive) {
      video.currentTime = 0
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    } else {
      video.pause()
      setPlaying(false)
    }
  }, [isActive])

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted
  }, [muted])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) { video.play(); setPlaying(true) }
    else { video.pause(); setPlaying(false) }
  }

  const handleDoubleTap = (e: React.MouseEvent) => {
    const now = Date.now()
    if (now - lastTap.current < 300) {
      if (!liked) {
        setLiked(true)
        setLikes(l => l + 1)
        setShowHeartBurst(true)
        setTimeout(() => setShowHeartBurst(false), 1000)
      }
    }
    lastTap.current = now
    togglePlay()
  }

  const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)

  return (
    <div className="relative w-full h-full bg-black flex-shrink-0 snap-start snap-always">
      <video
        ref={videoRef}
        src={reel.src}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        playsInline
        muted={muted}
        preload="metadata"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 pointer-events-none" />

      {/* Tap area */}
      <div className="absolute inset-0 cursor-pointer" onClick={handleDoubleTap} />

      {/* Double-tap heart burst */}
      <AnimatePresence>
        {showHeartBurst && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.4 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.4 }}
          >
            <Heart className="w-28 h-28 fill-white text-white drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play/pause indicator */}
      <AnimatePresence>
        {!playing && isActive && !showHeartBurst && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white fill-current ml-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right action buttons */}
      <div className="absolute right-3 bottom-28 flex flex-col gap-5 items-center z-10">
        {/* Like */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); setLikes(l => liked ? l - 1 : l + 1) }}
          className="flex flex-col items-center gap-1"
        >
          <motion.div whileTap={{ scale: 0.7 }} className="w-11 h-11 bg-black/30 backdrop-blur rounded-full flex items-center justify-center">
            <Heart className={`w-6 h-6 transition-all ${liked ? "fill-red-500 text-red-500" : "text-white"}`} />
          </motion.div>
          <span className="text-white text-[10px] font-black drop-shadow">{fmt(likes)}</span>
        </button>

        {/* Comment */}
        <button className="flex flex-col items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <div className="w-11 h-11 bg-black/30 backdrop-blur rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-[10px] font-black drop-shadow">{fmt(reel.comments)}</span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <div className="w-11 h-11 bg-black/30 backdrop-blur rounded-full flex items-center justify-center">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-[10px] font-black drop-shadow">Share</span>
        </button>

        {/* Save */}
        <button onClick={(e) => { e.stopPropagation(); setSaved(!saved) }} className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 bg-black/30 backdrop-blur rounded-full flex items-center justify-center">
            <Bookmark className={`w-6 h-6 ${saved ? "fill-white text-white" : "text-white"}`} />
          </div>
        </button>

        {/* Mute */}
        <button onClick={(e) => { e.stopPropagation(); onMuteToggle() }} className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 bg-black/30 backdrop-blur rounded-full flex items-center justify-center">
            {muted
              ? <VolumeX className="w-6 h-6 text-white" />
              : <Volume2 className="w-6 h-6 text-white" />
            }
          </div>
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute left-4 bottom-8 right-20 z-10 space-y-2">
        <div className="flex items-center gap-3">
          <img src={reel.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
          <div>
            <p className="text-white font-black text-sm drop-shadow">{reel.doctor}</p>
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">{reel.specialty}</p>
          </div>
          <button className="ml-2 border border-white text-white text-[10px] font-black px-3 py-0.5 rounded-full hover:bg-white hover:text-black transition-all">
            Follow
          </button>
        </div>
        <p className="text-white text-sm font-medium drop-shadow leading-snug line-clamp-2">
          {reel.title} — Understanding your health one reel at a time. Swipe up for more. 🏥
        </p>
      </div>
    </div>
  )
}

export default function ReelPlayer({ startIndex = 0 }: { startIndex?: number }) {
  const [activeIndex, setActiveIndex] = useState(startIndex)
  const [muted, setMuted] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const scrolled = container.scrollTop
    const height = container.clientHeight
    const idx = Math.round(scrolled / height)
    setActiveIndex(idx)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <div className="relative w-full h-full">
      {/* Scrollable container — full height snap scroll */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {REELS.map((reel, i) => (
          <div key={reel.id} className="w-full h-full snap-start snap-always flex-shrink-0">
            <ReelItem
              reel={reel}
              isActive={activeIndex === i}
              muted={muted}
              onMuteToggle={() => setMuted(m => !m)}
            />
          </div>
        ))}
      </div>

      {/* Reel counter */}
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur text-white text-[10px] font-black px-3 py-1 rounded-full z-20">
        {activeIndex + 1} / {REELS.length}
      </div>
    </div>
  )
}
