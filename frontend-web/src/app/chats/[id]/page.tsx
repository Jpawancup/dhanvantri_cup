"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { ArrowLeft, Phone, Video, Send, Image, Mic, MoreVertical, Paperclip, Camera, FileText } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

const initialMessages = [
  { id: 1, from: "them", text: "Namaste! How can I help you today?", time: "10:00 AM" },
  { id: 2, from: "me", text: "Hello Doctor, I have been having chest pain for the past 2 days.", time: "10:02 AM" },
  { id: 3, from: "them", text: "I understand. Is the pain sharp or dull? Does it radiate to your arm or jaw?", time: "10:03 AM" },
  { id: 4, from: "me", text: "It's more of a dull ache. Sometimes it spreads to left shoulder.", time: "10:05 AM" },
  { id: 5, from: "them", text: "Please come in for an examination. I will also recommend an ECG and blood test. You can book a slot via the app.", time: "10:06 AM" },
  { id: 6, from: "me", text: "Thank you Doctor. See you on Monday!", time: "10:10 AM" },
]

export default function ChatConversationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [messages, setMessages] = useState(initialMessages)
  const [inputText, setInputText] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [showGalleryDropup, setShowGalleryDropup] = useState(false)

  const handleSend = () => {
    if (!inputText.trim()) return
    const newMessage = {
      id: messages.length + 1,
      from: "me",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, newMessage])
    setInputText("")

    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        from: "them",
        text: "I received your message. Please book an appointment if urgent.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden relative">
        {/* Chat Header */}
        <div className="sticky top-0 z-20 bg-white border-b px-4 py-3 flex items-center gap-3 shadow-sm">
          <Link href="/chats">
            <button className="p-2 rounded-full hover:bg-medical-grey transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300" alt="Doctor" className="w-10 h-10 rounded-full border border-medical-grey object-cover" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-medical-green rounded-full border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">Dr. Amit Sharma</p>
            <p className="text-xs text-medical-green font-medium">Online</p>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <button className="p-2 rounded-full hover:bg-medical-grey text-medical-blue transition-colors">
               <Phone className="w-5 h-5" />
            </button>
            <button onClick={() => router.push("/video-consultation")} className="p-2 rounded-full hover:bg-medical-grey text-medical-green transition-colors">
               <Video className="w-5 h-5" />
            </button>
            <button className="p-2 justify-center hidden sm:flex rounded-full hover:bg-medical-grey text-muted-foreground transition-colors">
               <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f0f2f5]">
          <p className="text-center text-xs font-semibold text-muted-foreground py-2 sticky top-2 backdrop-blur-sm bg-white/50 w-fit mx-auto px-4 rounded-full shadow-sm">
             Today
          </p>
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[75%] px-4 py-2.5 shadow-sm text-sm ${msg.from === "me" ? "bg-medical-green text-white rounded-2xl rounded-tr-none" : "bg-white text-foreground rounded-2xl rounded-tl-none border border-medical-grey"}`}>
                  <p className="leading-snug">{msg.text}</p>
                  <p className={`text-[10px] mt-1 font-semibold flex items-center justify-end gap-1 ${msg.from === "me" ? "text-white/80" : "text-muted-foreground"}`}>
                     {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="bg-white border-t px-4 py-3 flex items-center gap-3 relative pb-safe">
          <AnimatePresence>
             {showGalleryDropup && (
                <motion.div 
                   initial={{ opacity: 0, y: 10, scale: 0.9 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: 10, scale: 0.9 }}
                   className="absolute bottom-16 left-4 bg-white rounded-2xl shadow-xl border border-medical-grey p-2 flex flex-col gap-2 z-30"
                >
                   <button className="flex items-center gap-3 px-4 py-2 hover:bg-medical-grey rounded-xl transition-colors text-sm font-semibold">
                      <div className="w-8 h-8 rounded-full bg-medical-blue/10 flex items-center justify-center text-medical-blue"><Camera className="w-4 h-4" /></div> Camera
                   </button>
                   <button className="flex items-center gap-3 px-4 py-2 hover:bg-medical-grey rounded-xl transition-colors text-sm font-semibold">
                      <div className="w-8 h-8 rounded-full bg-medical-green/10 flex items-center justify-center text-medical-green"><Image className="w-4 h-4" /></div> Gallery
                   </button>
                   <button className="flex items-center gap-3 px-4 py-2 hover:bg-medical-grey rounded-xl transition-colors text-sm font-semibold">
                      <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500"><FileText className="w-4 h-4" /></div> Document
                   </button>
                </motion.div>
             )}
          </AnimatePresence>
          
          <button onClick={() => setShowGalleryDropup(!showGalleryDropup)} className="p-2.5 rounded-full hover:bg-medical-grey text-muted-foreground transition-all">
             <Paperclip className="w-5 h-5 transform rotate-45" />
          </button>
          
          <Input 
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             className="flex-1 rounded-full bg-medical-grey border-none h-12 text-base px-6 shadow-inner focus-visible:ring-1 ring-medical-green" 
             placeholder="Type a message..." 
          />
          
          {inputText.trim() ? (
             <motion.button 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                onClick={handleSend}
                className="w-12 h-12 bg-medical-green rounded-full flex items-center justify-center flex-shrink-0 hover:bg-medical-green/90 transition-colors shadow-md"
             >
                <Send className="w-5 h-5 text-white ml-1" />
             </motion.button>
          ) : (
             <button onClick={() => setIsRecording(!isRecording)} className="p-2.5 rounded-full text-muted-foreground relative group flex items-center justify-center overflow-visible">
                {isRecording && <span className="absolute w-12 h-12 bg-medical-red/20 rounded-full animate-ping" />}
                <Mic className={`w-6 h-6 z-10 transition-colors ${isRecording ? "text-medical-red" : "group-hover:text-medical-green"}`} />
             </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
