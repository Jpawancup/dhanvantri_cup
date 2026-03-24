"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Edit, Settings, Share2, Grid, Bookmark, Heart, MessageCircle, MapPin, Calendar, Activity, ShieldCheck, Verified } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import Link from "next/link"

const posts = [
  { id: 1, type: "image", img: "https://images.unsplash.com/photo-1576091160550-2173599211d0?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, type: "video", img: "https://images.unsplash.com/photo-1542617300-47677d3419c8?q=80&w=2071&auto=format&fit=crop" },
  { id: 3, type: "image", img: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=2070&auto=format&fit=crop" },
  { id: 4, type: "image", img: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop" },
  { id: 5, type: "video", img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2047&auto=format&fit=crop" },
  { id: 6, type: "image", img: "https://images.unsplash.com/photo-1579152276506-5d5ecf1c9bb5?q=80&w=2070&auto=format&fit=crop" },
]

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-24">
        {/* Profile Header */}
        <div className="bg-white border-b px-6 py-10 flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-medical-blue via-medical-green to-medical-green shadow-xl ring-8 ring-medical-green/5">
              <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-white shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2070&auto=format&fit=crop" 
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-sm border border-medical-grey group cursor-pointer hover:bg-medical-green hover:text-white transition-all">
               <Edit className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-black flex items-center justify-center gap-1.5 leading-tight">
              Prakash Kumar <Verified className="w-5 h-5 text-medical-blue fill-medical-blue text-white" />
            </h1>
            <p className="text-sm font-bold text-muted-foreground flex items-center justify-center gap-1.5">
               <MapPin className="w-3.5 h-3.5 text-medical-red" /> Mumbai, Maharashtra
            </p>
          </div>

          <div className="flex gap-8 py-2">
            {[["Posts", "12"], ["Followers", "450"], ["Following", "180"]].map(([k, v]) => (
              <div key={k} className="flex flex-col items-center">
                <span className="text-xl font-black">{v}</span>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{k}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 w-full max-w-sm">
             <Button variant="outline" className="flex-1 rounded-full border-medical-grey font-bold h-12 shadow-sm">
                <Share2 className="w-4 h-4 mr-2" /> Share Profile
             </Button>
             <Link href="/settings" className="flex-1">
                <Button className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-full font-bold h-12 shadow-md">
                   <Settings className="w-4 h-4 mr-2" /> Edit Settings
                </Button>
             </Link>
          </div>
        </div>

        {/* Profile Content Tabs */}
        <div className="p-4 md:p-8">
          <Tabs defaultValue="posts">
            <TabsList className="w-full bg-medical-grey grid grid-cols-2 p-1 rounded-2xl h-14 border border-medical-grey/50">
              <TabsTrigger value="posts" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-medical-green data-[state=active]:shadow-sm font-black text-sm uppercase flex items-center gap-2">
                <Grid className="w-4 h-4" /> My Feed
              </TabsTrigger>
              <TabsTrigger value="records" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-medical-green data-[state=active]:shadow-sm font-black text-sm uppercase flex items-center gap-2">
                <Bookmark className="w-4 h-4" /> Saved Health
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-8">
              <div className="grid grid-cols-3 gap-1 md:gap-4">
                {posts.map((post) => (
                  <motion.div 
                    key={post.id} 
                    whileHover={{ scale: 0.98 }}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-medical-grey group shadow-sm border border-medical-grey/20"
                  >
                    <img src={post.img} alt="Post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="flex gap-4 text-white">
                         <span className="flex items-center gap-1 font-black text-sm"><Heart className="w-4 h-4 fill-white" /> 120</span>
                         <span className="flex items-center gap-1 font-black text-sm"><MessageCircle className="w-4 h-4 fill-white" /> 8</span>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="records" className="mt-8">
              <div className="space-y-4">
                {[
                  { title: "Diabetes Care Guide", type: "Article", author: "Dr. Anjali Desai", date: "Jan 12, 2026", img: "https://images.unsplash.com/photo-1542617300-47677d3419c8?q=80&w=300" },
                  { title: "Cardiology Breakthroughs", type: "Research", author: "Dr. Amit Sharma", date: "Dec 28, 2025", img: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=300" },
                ].map((item, idx) => (
                   <motion.div 
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="flex items-center gap-4 p-4 bg-white border border-medical-grey/60 rounded-2xl hover:border-medical-green/40 shadow-sm transition-all"
                   >
                      <img src={item.img} alt={item.title} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                      <div className="flex-1 min-w-0">
                         <h4 className="font-bold text-sm truncate">{item.title}</h4>
                         <p className="text-xs text-muted-foreground mt-0.5">{item.type} • {item.date}</p>
                         <p className="text-[10px] text-medical-green font-black mt-1">By {item.author}</p>
                      </div>
                      <Bookmark className="w-5 h-5 text-medical-green fill-medical-green" />
                   </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
