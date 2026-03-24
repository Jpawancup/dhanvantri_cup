"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react"

import { useRouter } from "next/navigation"

export default function FeedPost({ post }: { post?: any }) {
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [followed, setFollowed] = useState(false)
  const [saved, setSaved] = useState(false)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [likesCount, setLikesCount] = useState(post?.likes || 1243)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white md:rounded-[2.5rem] border-y md:border md:shadow-xl md:shadow-medical-grey/20 border-medical-grey/60 py-4 md:p-6 mb-4 md:mb-8 hover:border-medical-green/30 transition-all group overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4 md:mb-6 px-4 md:px-0">
        <div className="flex items-center gap-4">
          <div 
            onClick={() => router.push("/doctors/1")}
            className="cursor-pointer group flex items-center gap-4"
          >
            <div className="relative">
              <img 
                src={post?.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"}
                alt="Profile"
                className="w-12 h-12 rounded-2xl border-2 border-white object-cover shadow-sm group-hover:ring-4 ring-medical-green/10 transition-all"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-medical-green rounded-full border-2 border-white shadow-sm" />
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-tight group-hover:text-medical-green transition-colors">{post?.author || "Dr. Anjali Desai"}</h4>
              <p className="text-[10px] font-medium text-muted-foreground uppercase opacity-80 tracking-widest">{post?.role || "Neurologist"} • {post?.time || "2h ago"}</p>
            </div>
          </div>
          <button 
            onClick={() => setFollowed(!followed)}
            className={`ml-2 text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-xl transition-all ${
              followed 
                ? "bg-medical-grey text-muted-foreground opacity-60" 
                : "bg-medical-green/10 text-medical-green hover:bg-medical-green hover:text-white shadow-sm shadow-medical-green/5"
            }`}
          >
            {followed ? "Following" : "Follow"}
          </button>
        </div>
        <button className="text-muted-foreground hover:bg-medical-grey/50 p-2.5 rounded-2xl transition-all border border-medical-grey/40 shadow-sm">
          <MoreHorizontal className="w-5 h-5 opacity-40 hover:opacity-100" />
        </button>
      </div>
      
      <div className="mb-4 md:mb-6">
        <p className="text-foreground/90 text-sm leading-relaxed mb-4 px-4 md:px-0 font-medium">
          {post?.content || "Did you know? Regular sleep patterns are the single most important factor for cognitive longevity. 7-8 hours!"}
        </p>
        <div className="md:rounded-[2rem] overflow-hidden bg-medical-grey/10 relative border-y md:border border-medical-grey/30 group/img shadow-sm md:shadow-inner">
          <img 
            src={post?.image || "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?q=80&w=2070&auto=format&fit=crop"}
            alt="Post content"
            className="w-full h-auto object-cover max-h-[450px] group-hover/img:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-3 px-4 md:px-0">
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={() => {
              setLiked(!liked)
              setLikesCount((prev: number) => liked ? prev - 1 : prev + 1)
            }} 
            className="flex items-center gap-2 group"
          >
            <motion.div whileTap={{ scale: 0.8 }} className={`p-2 rounded-xl transition-all ${liked ? 'bg-medical-red/10' : 'bg-transparent'}`}>
              <Heart className={`w-6 h-6 transition-all duration-300 ${liked ? "fill-medical-red text-medical-red scale-110" : "group-hover:text-medical-red text-foreground/40"}`} />
            </motion.div>
            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${liked ? "text-medical-red" : "text-foreground/40"}`}>
              {(likesCount / 1000).toFixed(1)}k
            </span>
          </button>
          
          <button 
            onClick={() => setIsCommentModalOpen(true)}
            className="flex items-center gap-2 group"
          >
            <div className="p-2 rounded-xl transition-all group-hover:bg-medical-blue/10">
               <MessageCircle className="w-6 h-6 text-foreground/40 group-hover:text-medical-blue transition-colors" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 group-hover:text-medical-blue">48</span>
          </button>
          
          <button className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl transition-all group-hover:bg-medical-green/10">
               <Share2 className="w-6 h-6 text-foreground/40 group-hover:text-medical-green transition-colors" />
            </div>
          </button>
        </div>
        
        <button 
          onClick={() => setSaved(!saved)}
          className="group transition-all p-2 rounded-xl hover:bg-slate-100"
        >
          <Bookmark className={`w-6 h-6 transition-all ${saved ? "fill-slate-900 text-slate-900" : "text-foreground/30 group-hover:text-slate-900"}`} />
        </button>
      </div>

      {/* Comment Modal Interaction */}
      <AnimatePresence>
        {isCommentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCommentModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-lg overflow-hidden relative z-10 shadow-2xl"
            >
              <div className="p-4 border-b flex justify-between items-center bg-medical-grey/30">
                <h3 className="font-bold text-lg">Comments</h3>
                <button onClick={() => setIsCommentModalOpen(false)} className="text-muted-foreground hover:text-foreground">✕</button>
              </div>
              <div className="p-4 h-80 overflow-y-auto space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-medical-blue flex-shrink-0" />
                  <div className="bg-medical-grey/50 p-3 rounded-2xl rounded-tl-none">
                    <p className="text-xs font-bold mb-1">Rohan Mathur</p>
                    <p className="text-sm">This is very helpful! I&apos;ve noticed a huge difference since I started sleeping 8 hours.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-medical-pink flex-shrink-0" />
                  <div className="bg-medical-grey/50 p-3 rounded-2xl rounded-tl-none">
                    <p className="text-xs font-bold mb-1">Dr. Amit Shah</p>
                    <p className="text-sm">Great insight, Anjali. The amyloid plaque clearance research is fascinating.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t flex gap-2">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="flex-1 bg-medical-grey rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 ring-medical-green"
                />
                <button className="text-medical-green font-bold text-sm px-2">Post</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
