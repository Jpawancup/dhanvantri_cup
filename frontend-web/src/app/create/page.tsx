"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Image, Video, FileText, ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { getData, saveData, getCurrentUser, generateId } from "@/services/localDb"
import { useRouter } from "next/navigation"

const createOptions = [
  { label: "Post", desc: "Share a photo, video or health tip", icon: Image, href: "/dashboard", color: "bg-medical-green/10 text-medical-green" },
  { label: "Reel / Clip", desc: "Short vertical video — up to 60 seconds", icon: Video, href: "/clips", color: "bg-medical-blue/10 text-medical-blue" },
  { label: "Moment", desc: "Story that disappears after 24 hours", icon: FileText, href: "/moments", color: "bg-medical-pink/30 text-pink-500" },
]

export default function CreatePage() {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const [showImgInput, setShowImgInput] = useState(false)

  const handlePublish = () => {
    const user = getCurrentUser()
    if (!user) return alert("You must be logged in to post.")
    if (!content) return alert("Write something first.")
    
    const posts = getData("posts") || []
    posts.unshift({
      id: "post_" + generateId(),
      userId: user.id,
      content,
      image: imgUrl || null,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString()
    })
    saveData("posts", posts)
    router.push("/feed")
  }

  return (
    <DashboardLayout>
      <div className="max-w-lg mx-auto p-4 space-y-6">
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
