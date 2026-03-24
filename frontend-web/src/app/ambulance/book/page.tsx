"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Ambulance, ArrowLeft, MapPin, Search, ChevronRight, Activity, Clock, ShieldCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function BookAmbulancePage() {
  const router = useRouter()
  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden lg:max-w-4xl mx-auto bg-slate-900 border-x border-slate-800">
         {/* Top Bar overlay */}
         <div className="p-4 z-20 flex items-center justify-between sticky top-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-transparent pb-6">
            <Button onClick={() => router.back()} variant="outline" className="rounded-full w-12 h-12 border-none bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-0 flex items-center justify-center">
               <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
               <span className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-medical-green animate-pulse" /> Live Tracking
               </span>
            </div>
         </div>

         {/* Fake Map */}
         <div className="flex-1 relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center">
            <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
            
            {/* Map Markers */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
               <div className="bg-medical-red text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg mb-1 whitespace-nowrap uppercase tracking-widest border border-white/20">Pickup Location</div>
               <MapPin className="text-medical-red w-10 h-10 drop-shadow-md animate-bounce" />
               <div className="w-6 h-1 bg-black/30 blur-[2px] rounded-full mx-auto" />
            </div>

            <div className="absolute top-[30%] left-[60%] flex items-center">
               <div className="bg-white rounded-full p-2 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                 <Ambulance className="text-medical-blue w-6 h-6 transform -scale-x-100" />
               </div>
               <div className="ml-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black px-2 py-1.5 rounded-md border border-white/10">3 min</div>
            </div>

            <div className="absolute top-[60%] left-[20%] flex items-center">
               <div className="bg-white rounded-full p-2 shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-pulse">
                 <Ambulance className="text-medical-red w-6 h-6" />
               </div>
            </div>
         </div>

         {/* Booking Sheet */}
         <div className="bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20 overflow-hidden relative border-t-4 border-medical-red/20">
            <div className="w-12 h-1.5 bg-medical-grey rounded-full mx-auto mt-4" />
            
            <div className="p-6 md:p-8 space-y-6">
               <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-medical-grey/30 p-4 rounded-3xl">
                     <div className="flex flex-col items-center gap-1.5 pt-1">
                        <div className="w-3 h-3 rounded-full bg-medical-green shadow-[0_0_10px_rgba(52,199,89,0.5)] border-2 border-white" />
                        <div className="w-0.5 h-6 bg-medical-grey/80" />
                        <div className="w-3 h-3 rounded-full bg-medical-blue shadow-[0_0_10px_rgba(0,122,255,0.5)] border-2 border-white" />
                     </div>
                     <div className="flex-1 space-y-3">
                        <div className="flex items-center relative">
                           <Input className="border-none bg-transparent shadow-none px-0 text-sm font-bold focus-visible:ring-0 placeholder:text-muted-foreground/60 h-8" value="Current Location" readOnly />
                           <span className="text-[10px] font-black uppercase text-medical-green absolute right-0">Picking up now</span>
                        </div>
                        <div className="h-px bg-medical-grey/80 w-full" />
                        <div className="flex items-center pb-1">
                           <Input className="border-none bg-transparent shadow-none px-0 text-sm font-semibold focus-visible:ring-0 placeholder:text-muted-foreground placeholder:font-black h-8" placeholder="Where to?" />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <h3 className="font-extrabold text-xs uppercase tracking-widest text-muted-foreground">Available Fleets</h3>
                  
                  <div className="bg-white border-2 border-medical-red/20 rounded-3xl p-4 shadow-sm flex gap-4 items-center cursor-pointer ring-4 ring-medical-red/5">
                     <div className="w-16 h-16 rounded-2xl bg-medical-red/10 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-8 h-8 text-medical-red" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline pr-1">
                           <h4 className="font-black text-lg">ICU Ambulance</h4>
                           <span className="font-black text-lg text-medical-green">₹5,000</span>
                        </div>
                        <p className="text-xs font-semibold text-muted-foreground truncate opacity-80 mt-0.5">Critical care team, Full ventilator setup</p>
                        <p className="text-[11px] font-black text-medical-blue mt-2 flex items-center gap-1"><Clock className="w-3 h-3" /> 2 mins away (Fastest)</p>
                     </div>
                  </div>
               </div>

               <Button className="w-full bg-black hover:bg-black/90 text-white rounded-full h-16 font-black tracking-widest shadow-xl flex items-center justify-between px-1.5 focus:scale-95 transition-transform">
                  <span className="w-14" />
                  CONFIRM ICU AMBULANCE
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                     <ChevronRight className="w-6 h-6 text-white" />
                  </div>
               </Button>
            </div>
         </div>
      </div>
    </DashboardLayout>
  )
}
