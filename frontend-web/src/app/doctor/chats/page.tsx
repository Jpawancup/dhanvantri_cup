"use client"

import DoctorLayout from "@/layouts/DoctorLayout"
import { Search, MoreVertical, Phone, Video, Send, Paperclip, Smile, CheckCheck, MessageSquare, User, Clock, ShieldCheck, MoreHorizontal, PhoneCall, VideoIcon, BellOff, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const initialChats = [
  { id: 1, name: "Rahul Sharma", lastMsg: "Doctor, when should I take the red capsule?", time: "10:30 AM", unread: 2, online: true, img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36" },
  { id: 2, name: "Priya Malhotra", lastMsg: "Thank you for the consultation!", time: "09:15 AM", unread: 0, online: false, img: "https://images.unsplash.com/photo-1594824436998-d8906bd30114" },
  { id: 3, name: "Amit Verma", lastMsg: "The reports are attached below.", time: "Yesterday", unread: 0, online: true, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2" },
]

export default function DoctorChatsPage() {
  const [activeChat, setActiveChat] = useState(initialChats[0])
  
  return (
    <DoctorLayout>
      <div className="flex h-[calc(100vh-140px)] max-w-7xl mx-auto p-4 md:p-6 gap-6 tracking-tight overflow-hidden">
        {/* Left: Chat List */}
        <aside className="w-full md:w-96 flex flex-col bg-white rounded-[2.5rem] border border-medical-grey/60 overflow-hidden shadow-sm">
           <div className="p-6 space-y-4">
              <h2 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-3">
                 <MessageSquare className="w-6 h-6 text-medical-green" /> Consultations
              </h2>
              <div className="relative group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40 group-focus-within:text-medical-green transition-all" />
                 <Input className="pl-11 rounded-2xl h-12 bg-medical-grey/20 border-medical-grey/40 focus:bg-white transition-all font-bold text-xs" placeholder="Search Patients..." />
              </div>
           </div>

           <div className="flex-1 overflow-y-auto space-y-1 px-3 pb-6 custom-scrollbar">
              {initialChats.map((chat) => (
                 <motion.div 
                   key={chat.id} 
                   onClick={() => setActiveChat(chat)}
                   className={`p-4 rounded-3xl flex items-center gap-4 cursor-pointer transition-all group relative ${activeChat.id === chat.id ? 'bg-medical-green text-white shadow-xl shadow-medical-green/20 scale-[1.02] z-10' : 'hover:bg-medical-grey/50'}`}
                 >
                    <div className="relative flex-shrink-0">
                       <img src={chat.img} alt={chat.name} className={`w-14 h-14 rounded-2xl object-cover border-2 ${activeChat.id === chat.id ? 'border-white/40' : 'border-white shadow-sm'}`} />
                       {chat.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-medical-green rounded-full border-2 border-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-center mb-0.5">
                          <h4 className={`font-black uppercase text-xs tracking-tighter truncate ${activeChat.id === chat.id ? 'text-white' : 'text-foreground'}`}>{chat.name}</h4>
                          <span className={`text-[9px] font-bold opacity-40 ${activeChat.id === chat.id ? 'text-white' : 'text-muted-foreground'}`}>{chat.time}</span>
                       </div>
                       <p className={`text-[11px] font-bold truncate ${activeChat.id === chat.id ? 'text-white/80' : 'text-muted-foreground/60'}`}>{chat.lastMsg}</p>
                    </div>
                    
                    {/* Hover Icons: Call and Video */}
                    <AnimatePresence>
                       {activeChat.id !== chat.id && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                             <button className="p-2 bg-white rounded-xl text-medical-blue shadow-lg border border-medical-grey/40 hover:scale-110 active:scale-95"><PhoneCall className="w-4 h-4" /></button>
                             <button className="p-2 bg-white rounded-xl text-medical-green shadow-lg border border-medical-grey/40 hover:scale-110 active:scale-95"><VideoIcon className="w-4 h-4" /></button>
                          </div>
                       )}
                    </AnimatePresence>

                    {chat.unread > 0 && activeChat.id !== chat.id && (
                       <div className="absolute right-4 bottom-4 w-5 h-5 bg-medical-green text-white rounded-full flex items-center justify-center text-[9px] font-black shadow-lg">
                          {chat.unread}
                       </div>
                    )}
                 </motion.div>
              ))}
           </div>
        </aside>

        {/* Right: Message Window */}
        <main className="flex-1 hidden md:flex flex-col bg-white rounded-[2.5rem] border border-medical-grey/60 overflow-hidden shadow-sm relative">
           {/* Chat Header */}
           <div className="p-6 border-b border-medical-grey/40 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="relative">
                    <img src={activeChat.img} className="w-12 h-12 rounded-2xl object-cover border-2 border-medical-grey/30 shadow-sm" />
                    {activeChat.online && <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-medical-green rounded-full border-2 border-white" />}
                 </div>
                 <div>
                    <h3 className="font-black uppercase text-sm tracking-tighter italic">{activeChat.name}</h3>
                    <p className="text-[10px] font-black text-medical-green uppercase tracking-widest">{activeChat.online ? 'Online' : 'Away'}</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <button className="p-3 bg-medical-grey/30 rounded-2xl text-medical-blue hover:bg-medical-blue hover:text-white transition-all"><Phone className="w-5 h-5" /></button>
                 <button className="p-3 bg-medical-grey/30 rounded-2xl text-medical-green hover:bg-medical-green hover:text-white transition-all"><Video className="w-5 h-5" /></button>
                 
                 <DropdownMenu>
                    <DropdownMenuTrigger>
                       <div className="p-3 bg-medical-grey/30 rounded-2xl text-muted-foreground hover:bg-medical-grey transition-all cursor-pointer"><MoreHorizontal className="w-5 h-5" /></div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl p-2 min-w-[180px] shadow-2xl">
                       <DropdownMenuItem className="rounded-xl font-black text-[10px] uppercase py-3"><User className="w-4 h-4 mr-2" /> View Records</DropdownMenuItem>
                       <DropdownMenuItem className="rounded-xl font-black text-[10px] uppercase py-3"><Clock className="w-4 h-4 mr-2" /> History</DropdownMenuItem>
                       <DropdownMenuItem className="rounded-xl font-black text-[10px] uppercase py-3 border-t"><BellOff className="w-4 h-4 mr-2" /> Mute Chats</DropdownMenuItem>
                       <DropdownMenuItem className="rounded-xl font-black text-[10px] uppercase py-3 text-medical-red"><Trash2 className="w-4 h-4 mr-2" /> Clear Chat</DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
              </div>
           </div>

           {/* Messages (Mock) */}
           <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-slate-50/30">
              <div className="flex justify-center"><span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30 bg-medical-grey/60 px-4 py-1 rounded-full">Today</span></div>
              
              <div className="flex justify-start">
                 <div className="max-w-md bg-white border border-medical-grey/60 p-5 rounded-[2rem] rounded-tl-none shadow-sm space-y-2">
                    <p className="text-sm font-medium leading-relaxed opacity-70 italic">&quot;Good morning Doctor. My blood sugar levels are slightly lower today after the new medication.&quot;</p>
                    <span className="text-[9px] font-black opacity-30 flex items-center gap-2">10:30 AM <CheckCheck className="w-3 h-3 text-medical-blue" /></span>
                 </div>
              </div>

              <div className="flex justify-end">
                 <div className="max-w-md bg-slate-900 text-white p-5 rounded-[2rem] rounded-tr-none shadow-xl space-y-2">
                    <p className="text-sm font-medium leading-relaxed opacity-90">&quot;That is expected, Rahul. Continue the same dosage for 3 more days and let me know the readings.&quot;</p>
                    <span className="text-[9px] font-black opacity-40 flex justify-end gap-2">10:32 AM</span>
                 </div>
              </div>

              <div className="flex justify-start">
                 <div className="max-w-md bg-white border border-medical-grey/60 p-5 rounded-[2rem] rounded-tl-none shadow-sm space-y-2">
                    <p className="text-sm font-medium leading-relaxed opacity-70 italic">&quot;Doctor, when should I take the red capsule?&quot;</p>
                    <span className="text-[9px] font-black opacity-30 flex items-center gap-2">10:45 AM</span>
                 </div>
              </div>
           </div>

           {/* Chat Input */}
           <div className="p-6 border-t border-medical-grey/40">
              <div className="bg-medical-grey/20 rounded-[2.5rem] p-2 flex items-center gap-2 border border-medical-grey/30 focus-within:bg-white focus-within:border-medical-green/40 focus-within:shadow-xl transition-all">
                 <button className="p-3.5 hover:bg-white rounded-full transition-all text-muted-foreground opacity-50"><Smile className="w-5 h-5" /></button>
                 <button className="p-3.5 hover:bg-white rounded-full transition-all text-muted-foreground opacity-50"><Paperclip className="w-5 h-5" /></button>
                 <Input className="flex-1 bg-transparent border-none focus:ring-0 shadow-none font-bold text-sm h-12" placeholder="Start typing medical advice..." />
                 <button className="h-12 w-12 bg-medical-green hover:bg-medical-green/90 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all"><Send className="w-5 h-5" /></button>
              </div>
           </div>
        </main>
      </div>
    </DoctorLayout>
  )
}
