"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import Link from "next/link"
import { Search, Phone, Video, MoreVertical, MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const chatList = [
  { id: "1", name: "Dr. Amit Sharma", last: "Thank you, see you on Monday!", time: "10:30 AM", unread: 2, img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300", online: true, isDoctor: true },
  { id: "2", name: "Dr. Anjali Desai", last: "Please avoid screen time before bedtime.", time: "Yesterday", unread: 0, img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300", online: false, isDoctor: true },
  { id: "3", name: "Priya (Friend)", last: "Did you try that ayurvedic remedy? 🌿", time: "Yesterday", unread: 1, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300", online: true, isDoctor: false },
  { id: "4", name: "Dr. Raj Patel", last: "Your X-ray report looks normal.", time: "Mon", unread: 0, img: "https://images.unsplash.com/photo-1594824436998-d8906bd30114?q=80&w=300", online: false, isDoctor: true },
  { id: "5", name: "Ravi (Friend)", last: "Bhai, hospital mein kaisa tha?", time: "Sun", unread: 0, img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300", online: true, isDoctor: false },
]

export default function ChatsPage() {
  const router = useRouter()

  return (
    <DashboardLayout>
      <div className="bg-white border-b px-4 pt-4 pb-3 sticky top-16 z-20 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-black flex items-center gap-2"><MessageCircle className="w-5 h-5 text-medical-green" /> ChitChats</h1>
          <button className="p-2 rounded-full hover:bg-medical-grey transition-colors"><MoreVertical className="w-5 h-5" /></button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input className="pl-9 bg-medical-grey border-none rounded-full h-12" placeholder="Search messages..." />
        </div>
      </div>

      <div className="divide-y pb-24">
        {chatList.map((chat) => (
          <Link key={chat.id} href={`/chats/${chat.id}`}>
            <div className="flex items-center gap-4 px-4 py-4 hover:bg-medical-grey/40 transition-colors cursor-pointer group">
              <div className="relative flex-shrink-0">
                <img src={chat.img} alt={chat.name} className="w-14 h-14 rounded-full object-cover shadow-sm border-2 border-white ring-2 ring-medical-grey/40" />
                {chat.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-medical-green rounded-full border-2 border-white shadow-[0_0_6px_rgba(52,199,89,0.5)]" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-black text-base truncate">{chat.name}</p>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0 ml-2 font-bold uppercase tracking-widest">{chat.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate mt-0.5 font-medium">{chat.last}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {chat.isDoctor && (
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push("/video-consultation"); }}
                    className="p-2 rounded-full hover:bg-medical-green/10 text-muted-foreground hover:text-medical-green transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = "tel:+919876543210"; }}
                  className="p-2 rounded-full hover:bg-medical-blue/10 text-muted-foreground hover:text-medical-blue transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Phone className="w-4 h-4" />
                </button>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-medical-green rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_8px_rgba(52,199,89,0.3)]">
                    <span className="text-[10px] font-black text-white">{chat.unread}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  )
}
