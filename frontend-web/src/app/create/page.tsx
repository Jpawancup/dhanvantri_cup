"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Image, Video, FileText, ArrowLeft, Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { useMockStore } from "@/store/mockStore"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const createOptions = [
  { label: "Post", desc: "Share a photo, video or health tip", icon: Image, href: "/feed", color: "bg-medical-green/10 text-medical-green" },
  { label: "Reel / Clip", desc: "Short vertical video — up to 60 seconds", icon: Video, href: "/clips", color: "bg-medical-blue/10 text-medical-blue" },
  { label: "Moment", desc: "Story that disappears after 24 hours", icon: FileText, href: "/moments", color: "bg-medical-pink/30 text-pink-500" },
]

export default function CreatePage() {
  const router = useRouter()
  const { currentUser, posts } = useMockStore()
  const [content, setContent] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const [showImgInput, setShowImgInput] = useState(false)
  const [published, setPublished] = useState(false)

  const handlePublish = () => {
    if (!content.trim()) return
    setPublished(true)
    setTimeout(() => {
      setPublished(false)
      router.push("/feed")
    }, 2000)
  }

  return (
    <DashboardLayout>
      <AnimatePresence>
        {published && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl bg-medical-green text-white font-black text-sm"
          >
            <CheckCircle2 className="w-5 h-5" /> Post Published!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-lg mx-auto p-4 space-y-5 pb-28">
        <div className="flex items-center gap-3 pt-2">
          <Link href="/dashboard">
            <button className="p-2 rounded-full hover:bg-medical-grey transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-xl font-bold">Create</h1>
        </div>

        <div className="space-y-3">
          {createOptions.map((opt) => (
            <Link key={opt.label} href={opt.href}>
              <div className="bg-white rounded-2xl border border-medical-grey/60 p-5 flex items-center gap-4 hover:border-medical-green/50 hover:shadow-md transition-all cursor-pointer group">
                <div className={`w-14 h-14 rounded-2xl ${opt.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <opt.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">{opt.label}</h3>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Post Box */}
        <div className="bg-white rounded-2xl border border-medical-grey/60 p-4 space-y-3">
          <div className="flex items-center gap-3 mb-2">
            {currentUser.profileImage && (
              <img src={currentUser.profileImage} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-medical-green/20" />
            )}
            <div>
              <p className="font-black text-sm">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground font-bold capitalize">{currentUser.role}</p>
            </div>
          </div>
          <h3 className="font-semibold">Quick Post</h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Share a health tip, case study or general thought..."
            className="w-full resize-none text-sm border border-border rounded-xl p-3 focus:ring-2 focus:ring-medical-green focus:outline-none"
          />
          {showImgInput && (
            <input
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              placeholder="Paste an image URL (optional)"
              className="w-full text-xs font-medium border border-border rounded-xl px-3 py-2 bg-slate-50 outline-none focus:ring-1 focus:ring-medical-green"
            />
          )}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button onClick={() => setShowImgInput(!showImgInput)} className="p-2 rounded-lg hover:bg-medical-grey transition-colors text-muted-foreground hover:text-medical-green">
                <Image className="w-5 h-5" />
              </button>
            </div>
            <Button onClick={handlePublish} className="bg-medical-green hover:bg-medical-green/90 text-white rounded-full px-6 flex items-center gap-2">
              <Send className="w-4 h-4" /> Publish
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
