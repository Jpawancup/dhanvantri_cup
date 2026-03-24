"use client"

import { Plus, ArrowLeft, Camera } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function StoriesSection() {
  const [activeStory, setActiveStory] = useState<any>(null)

  const dummyStories = [
    { id: 1, name: "Dr. Sharma", hasStory: true, img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300" },
    { id: 2, name: "Dr. Sharma", hasStory: true, img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300" },
    { id: 3, name: "Priya", hasStory: true, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300" },
    { id: 4, name: "Dr. Patel", hasStory: false, img: "https://images.unsplash.com/photo-1594824436998-d8906bd30114?q=80&w=300" },
    { id: 5, name: "Dr. Anjali", hasStory: false, img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300" },
  ]

  const handleAddMoment = () => {
    alert("Camera opening simulation... 📸\nPlease allow camera access to share your health moment.")
  }

  return (
    <>
      <div className="w-full bg-white p-4 border-b">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {/* Add Story Button */}
          <div onClick={handleAddMoment} className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0 snap-start group">
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-dashed border-medical-grey group-hover:border-medical-green group-hover:bg-medical-green/5 transition-all flex items-center justify-center p-1">
               <div className="w-full h-full rounded-full bg-medical-grey flex items-center justify-center group-hover:bg-medical-green transition-colors">
                  <Plus className="w-8 h-8 text-muted-foreground group-hover:text-white" />
               </div>
               <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-medical-blue rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg">
                  <Camera className="w-3.5 h-3.5" />
               </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-medical-green transition-colors">Add Moment</span>
          </div>

          {/* Existing Stories */}
          {dummyStories.map((story) => (
            <div key={story.id} onClick={() => story.hasStory && setActiveStory(story)} className={`flex flex-col items-center gap-1.5 cursor-pointer w-14 md:w-16 flex-shrink-0 snap-center transition-all ${!story.hasStory ? "opacity-60" : "hover:scale-105"}`}>
              <div className={`w-[56px] h-[56px] md:w-[66px] md:h-[66px] rounded-full p-[2px] transition-all ${story.hasStory ? "bg-gradient-to-tr from-medical-blue via-medical-green to-medical-green animate-shimmer" : "bg-medical-grey"}`}>
                <div className="w-full h-full rounded-full border-[2px] border-white overflow-hidden bg-white shadow-inner">
                  <img 
                    src={story.img} 
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase text-center truncate w-full px-1">{story.name}</span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeStory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 flex flex-col items-center justify-center backdrop-blur-sm"
          >
             <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-[101]">
                <button onClick={() => setActiveStory(null)} className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                   <ArrowLeft className="w-6 h-6 text-white" />
                </button>
             </div>
             
             <div className="absolute top-2 w-full max-w-lg px-4 flex gap-1 z-[101]">
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden flex-1">
                   <motion.div 
                      key={activeStory.id}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 7, ease: "linear" }}
                      onAnimationComplete={() => setActiveStory(null)}
                      className="h-full bg-white shadow-[0_0_10px_white]"
                   />
                </div>
             </div>
 
             <div className="absolute top-16 left-4 flex flex-col items-start gap-2 z-[101]">
                <div className="flex items-center gap-3 bg-white/10 p-2 pr-5 rounded-2xl backdrop-blur-xl border border-white/20">
                   <img src={activeStory.img} className="w-10 h-10 rounded-full border-2 border-medical-green object-cover" />
                   <div>
                      <h3 className="text-white font-black text-sm uppercase tracking-widest">{activeStory.name}</h3>
                      <p className="text-[10px] text-white/60 font-medium">Just now</p>
                   </div>
                </div>
             </div>
 
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.8, opacity: 0 }}
               className="w-full max-w-sm aspect-[9/16] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative"
             >
                <img 
                  src={activeStory.img} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-10 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                   <h2 className="text-white text-xl font-black italic">&ldquo;Health is wealth. Stay active!&rdquo;</h2>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
