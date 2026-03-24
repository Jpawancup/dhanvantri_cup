"use client"

import DoctorLayout from "@/layouts/DoctorLayout"
import { Grid, Heart, MessageCircle, MoreVertical, Plus, Zap, Activity, ShieldCheck, Video, Image, Play, Eye, Share2, PlusCircle, Search, Filter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const doctorPosts = [
  { id: 1, type: "video", label: "Health Clip", title: "3 Tips for Heart Health", views: "12K", likes: 850, comments: 45, date: "2 Feb", img: "https://images.unsplash.com/photo-1576091160550-2173599211d0?q=80&w=300" },
  { id: 2, type: "image", label: "Clinic Story", title: "Successful Bypass Surgery Case", views: "5.4K", likes: 320, comments: 12, date: "24 Jan", img: "https://images.unsplash.com/photo-1542617300-47677d3419c8?q=80&w=300" },
  { id: 3, type: "article", label: "Health Tip", title: "Managing Blood Pressure at Home", views: "8.1K", likes: 1.2, comments: 82, date: "15 Jan", img: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=300" },
]

export default function DoctorPostsPage() {
  const router = useRouter()

  return (
    <DoctorLayout>
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-10 pb-32 tracking-tight">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-medical-grey/40 pb-10">
          <div className="flex flex-col gap-1 tracking-tighter">
             <h1 className="text-4xl font-black italic flex items-center gap-3 uppercase">
                <Grid className="w-10 h-10 text-medical-green animate-pulse" /> My Content Studio
             </h1>
             <p className="text-[10px] font-black uppercase text-muted-foreground opacity-60 tracking-widest leading-none mt-1">Digital Influence Terminal</p>
          </div>
          <div className="flex items-center gap-3">
             <Button onClick={() => router.push("/doctor/posts/new")} className="bg-medical-green hover:bg-medical-green/90 text-white rounded-2xl h-14 px-10 font-black text-xs uppercase tracking-widest shadow-xl shadow-medical-green/20">+ CREATE NEW</Button>
          </div>
        </div>

        {/* Quick Create Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { name: "Health Clip", icon: Video, color: "bg-medical-blue/10 text-medical-blue", desc: "Short Vertical Video" },
             { name: "Health Insight", icon: Image, color: "bg-medical-green/10 text-medical-green", desc: "Photo & Tip Overlay" },
             { name: "Moment/Story", icon: PlusCircle, color: "bg-medical-pink/10 text-medical-pink", desc: "Expires in 24 Hours" },
           ].map(t => (
             <div key={t.name} onClick={() => router.push("/doctor/posts/new")} className="bg-white border border-medical-grey/50 p-6 rounded-[2rem] flex items-center gap-5 hover:border-medical-green/40 hover:shadow-2xl hover:shadow-medical-green/5 transition-all group cursor-pointer relative overflow-hidden">
                <div className={`w-14 h-14 rounded-2xl ${t.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                   <t.icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                   <h4 className="font-extrabold text-[11px] uppercase tracking-widest leading-none mt-1">{t.name}</h4>
                   <p className="text-[9px] text-muted-foreground font-black opacity-60 uppercase tracking-widest mt-1.5">{t.desc}</p>
                </div>
             </div>
           ))}
        </div>

        <Tabs defaultValue="all" className="w-full">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-t border-medical-grey/30 pt-10">
              <TabsList className="bg-medical-grey/30 p-1 rounded-2xl h-14 border border-medical-grey/50 w-full md:max-w-md grid grid-cols-3">
                 <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg font-black text-[10px] uppercase transition-all tracking-widest">Library</TabsTrigger>
                 <TabsTrigger value="clips" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg font-black text-[10px] uppercase transition-all tracking-widest">Clips</TabsTrigger>
                 <TabsTrigger value="articles" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg font-black text-[10px] uppercase transition-all tracking-widest">Drafts</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-3">
                 <div className="relative group flex-1 md:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40 group-focus-within:text-medical-green transition-colors" />
                    <Input className="pl-11 rounded-2xl bg-white border border-medical-grey/50 h-14 shadow-sm focus:ring-4 focus:ring-medical-green/10 transition-all font-bold text-xs" placeholder="Search Studio..." />
                 </div>
                 <button className="h-14 w-14 bg-white border border-medical-grey/50 rounded-2xl flex items-center justify-center text-muted-foreground hover:bg-medical-grey transition-all shadow-sm">
                    <Filter className="w-5 h-5" />
                 </button>
              </div>
           </div>

           <TabsContent value="all" className="w-full outline-none focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {/* Library Placeholder */}
                 <div onClick={() => router.push("/doctor/posts/new")} className="bg-medical-grey/10 rounded-[2.5rem] border-2 border-dashed border-medical-grey/60 flex flex-col items-center justify-center p-8 space-y-4 hover:bg-white hover:border-medical-green/40 transition-all group cursor-pointer aspect-video md:aspect-auto h-[320px]">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-medical-green group-hover:text-white transition-all"><Plus className="w-10 h-10" /></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 italic">Upload New Content Hub</p>
                 </div>

                 {doctorPosts.map((p, i) => (
                    <motion.div 
                      key={p.id} 
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-[2.5rem] border border-medical-grey/60 shadow-lg hover:border-medical-green/40 hover:shadow-2xl hover:shadow-medical-green/5 transition-all group relative cursor-pointer flex flex-col h-[420px] overflow-hidden"
                    >
                       <div className="relative h-60 overflow-hidden bg-medical-grey/30 border-b border-medical-grey/40">
                          <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-xl text-white text-[9px] font-black px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/20 uppercase tracking-widest">
                             {p.type === "video" ? <Video className="w-3.5 h-3.5 text-medical-blue" /> : <Image className="w-3.5 h-3.5 text-medical-green" />} {p.label}
                          </div>
                          {p.type === "video" && <div className="absolute inset-0 flex items-center justify-center"><div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:scale-125 transition-all border border-white/40"><Play className="fill-white text-white w-6 h-6 ml-1" /></div></div>}
                       </div>
                       <div className="p-8 flex-1 flex flex-col justify-between">
                          <div className="space-y-4">
                             <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-muted-foreground opacity-40 uppercase tracking-widest">{p.date} • Digital Library</span>
                                <div className="flex items-center gap-1.5 opacity-40">
                                   <Eye className="w-4 h-4" /> <span className="text-[10px] font-black">{p.views}</span>
                                </div>
                             </div>
                             <h4 className="font-black text-lg leading-tight line-clamp-2 uppercase tracking-tighter italic">{p.title}</h4>
                          </div>
                          <div className="flex items-center justify-between pt-6 border-t border-dashed border-medical-grey/60">
                             <div className="flex gap-6">
                                <span className="flex items-center gap-1.5 text-[10px] font-black opacity-60 group-hover:text-medical-pink transition-colors"><Heart className="w-4 h-4 fill-medical-pink/10" /> {p.likes}K</span>
                                <span className="flex items-center gap-1.5 text-[10px] font-black opacity-60 group-hover:text-medical-blue transition-colors"><MessageCircle className="w-4 h-4 fill-medical-blue/10" /> {p.comments}</span>
                             </div>
                             <button className="p-3.5 rounded-2xl hover:bg-medical-grey/50 transition-all text-muted-foreground/60 border border-medical-grey/40"><Share2 className="w-5 h-5 text-current" /></button>
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </TabsContent>
        </Tabs>
      </div>
    </DoctorLayout>
  )
}
