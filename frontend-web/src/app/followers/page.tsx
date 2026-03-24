"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Search, Heart, UserPlus, UserCheck, ChevronRight, MapPin, Star, MoreVertical } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const followers = [
  { id: 1, name: "Dr. Amit Sharma", role: "Cardiologist", following: true, img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300", verified: true },
  { id: 2, name: "Priya Singh", role: "Wellness Coach", following: false, img: "https://images.unsplash.com/photo-1594824436998-d8906bd30114?q=80&w=300", verified: false },
  { id: 3, name: "Rohan Das", role: "Fitness Enthusiast", following: true, img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300", verified: false },
]

export default function FollowersPage() {
  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto p-4 md:p-8 space-y-8 pb-32">
        <div className="flex flex-col gap-1 tracking-tighter">
          <h1 className="text-3xl font-black">Your Network</h1>
          <p className="text-sm font-bold text-muted-foreground opacity-60 uppercase tracking-widest text-[10px]">Follow doctors and health experts for daily tips.</p>
        </div>

        <div className="relative group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50 group-focus-within:text-medical-green transition-colors" />
           <Input className="pl-11 rounded-3xl bg-medical-grey border-none h-12 shadow-sm focus:ring-2 focus:ring-medical-green/50 transition-all font-medium text-sm" placeholder="Search friends, doctors, experts..." />
        </div>

        <Tabs defaultValue="followers">
           <TabsList className="w-full bg-medical-grey grid grid-cols-2 p-1 rounded-2xl h-14 border border-medical-grey/50">
              <TabsTrigger value="followers" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-xl font-black text-xs uppercase transition-all">450 Followers</TabsTrigger>
              <TabsTrigger value="following" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-xl font-black text-xs uppercase transition-all">182 Following</TabsTrigger>
           </TabsList>

           <TabsContent value="followers" className="mt-8">
              <div className="space-y-4">
                 {followers.map((f, i) => (
                    <motion.div 
                      key={f.id} 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 bg-white border border-medical-grey/50 p-4 rounded-3xl hover:border-medical-green/40 hover:shadow-xl hover:shadow-medical-green/5 transition-all group backdrop-blur-md"
                    >
                       <div className="relative">
                          <img src={f.img} alt={f.name} className="w-14 h-14 rounded-full object-cover shadow-lg group-hover:scale-110 transition-transform" />
                          {f.verified && <div className="absolute -bottom-1 -right-1 bg-medical-blue text-white rounded-full p-0.5 border-2 border-white shadow-sm ring-2 ring-medical-blue/5"><Star className="w-2.5 h-2.5 fill-white" /></div>}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                             <h4 className="font-black text-sm tracking-tight truncate">{f.name}</h4>
                             {f.verified && <span className="bg-medical-blue/10 text-medical-blue text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Verified</span>}
                          </div>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60 leading-tight mt-0.5">{f.role}</p>
                       </div>
                       <div className="flex gap-2">
                          {f.following ? (
                             <Button variant="outline" className="rounded-full h-10 px-6 border-medical-grey text-muted-foreground font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-medical-grey/20 transition-all">
                                <UserCheck className="w-3.5 h-3.5" /> Following
                             </Button>
                          ) : (
                             <Button className="bg-medical-green hover:bg-medical-green/90 text-white rounded-full h-10 px-6 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-medical-green/20 transition-all active:scale-95">
                                <UserPlus className="w-3.5 h-3.5" /> Follow Back
                             </Button>
                          )}
                          <button className="p-2.5 rounded-full hover:bg-medical-grey transition-colors text-muted-foreground/60"><MoreVertical className="w-4 h-4" /></button>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </TabsContent>

           <TabsContent value="following" className="mt-8">
              <div className="text-center py-20 bg-white border border-dashed rounded-3xl space-y-4">
                 <div className="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto ring-8 ring-medical-blue/5"><Heart className="w-8 h-8 text-medical-blue animate-pulse" /></div>
                 <p className="text-sm font-bold text-muted-foreground italic leading-relaxed">Follow your favorite health experts and specialists.</p>
                 <Button className="bg-medical-green hover:bg-medical-green/90 text-white rounded-full font-black text-[10px] uppercase tracking-widest px-8 py-6 shadow-xl shadow-medical-green/20">Find Experts</Button>
              </div>
           </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
