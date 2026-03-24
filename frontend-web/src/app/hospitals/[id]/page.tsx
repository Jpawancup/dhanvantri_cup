"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Star, MapPin, Phone, MessageSquare, Building2, Bed, Users, ShieldCheck, ChevronRight, Clock, Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HospitalDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      {/* Back bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-2 sticky top-16 z-20">
        <Link href="/hospitals"><button className="p-2 rounded-full hover:bg-medical-grey transition-colors"><ArrowLeft className="w-5 h-5" /></button></Link>
        <h2 className="font-semibold">Hospital Details</h2>
      </div>

      {/* Hero / Cover */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop" className="w-full h-full object-cover" alt="Hospital" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
          <div className="text-white">
            <h1 className="text-2xl md:text-3xl font-extrabold drop-shadow-md">Apollo Hospitals</h1>
            <div className="flex items-center gap-2 text-sm mt-1 opacity-90">
              <span className="bg-medical-green text-white px-2 py-0.5 rounded text-[10px] font-bold">MULTI-SPECIALTY</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.8</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> 2.1 km away</span>
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            <Button className="bg-white text-medical-green hover:bg-white/90 rounded-full font-bold px-6">Direct Call</Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="overview">
            <TabsList className="w-full bg-medical-grey grid grid-cols-3">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-medical-green font-semibold">Overview</TabsTrigger>
              <TabsTrigger value="doctors" className="data-[state=active]:bg-white data-[state=active]:text-medical-green font-semibold">Doctors</TabsTrigger>
              <TabsTrigger value="facilities" className="data-[state=active]:bg-white data-[state=active]:text-medical-green font-semibold">Facilities</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="bg-white rounded-2xl border border-medical-grey/60 p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Info className="w-5 h-5 text-medical-green" /> About Apollo</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Apollo Hospitals established in 1983, by Dr. Prathap C Reddy, Renowned Cardiologist. It is one of the largest and most respected healthcare providers in Asia. With a mission to bring healthcare of international standards within the reach of every individual.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                   <div className="flex items-center gap-3 bg-medical-grey/30 p-4 rounded-xl">
                      <Bed className="w-6 h-6 text-medical-blue" />
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Beds Available</p>
                        <p className="font-bold">45 / 500</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3 bg-medical-grey/30 p-4 rounded-xl">
                      <Clock className="w-6 h-6 text-medical-green" />
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">OPD Timing</p>
                        <p className="font-bold">24 x 7 Open</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-medical-grey/60 p-6 shadow-sm">
                 <h3 className="font-bold text-lg mb-4">Location & Directions</h3>
                 <div className="bg-medical-grey/40 h-40 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm font-medium italic">[Google Maps Placeholder]</span>
                 </div>
                 <div className="flex items-start gap-3">
                   <MapPin className="w-5 h-5 text-medical-red mt-0.5" />
                   <div className="flex-1">
                      <p className="font-semibold text-sm">Main Road, Jubilee Hills, Hyderabad, 500033</p>
                      <button className="text-medical-blue text-xs font-bold mt-1">Get Directions ↗</button>
                   </div>
                 </div>
              </div>
            </TabsContent>

            <TabsContent value="doctors" className="mt-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white border rounded-2xl hover:border-medical-green/40 transition-colors shadow-sm cursor-pointer group">
                      <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300" className="w-16 h-16 rounded-xl object-cover" alt="Dr." />
                      <div className="flex-1">
                        <p className="font-bold text-sm">Dr. Amit Sharma</p>
                        <p className="text-xs text-medical-blue font-medium">Cardiologist (14 yrs exp)</p>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                           <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> 4.8 • 220 reviews
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-medical-grey group-hover:text-medical-green transition-transform group-hover:translate-x-1" />
                    </div>
                  ))}
               </div>
            </TabsContent>

            <TabsContent value="facilities" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                   {["ICU", "Emergency", "Diagnostics", "NICU", "Ambulance", "Pharmacy", "Operation Theatre", "Radiology", "OPD"].map(f => (
                     <div key={f} className="flex items-center gap-3 p-4 bg-white border rounded-xl text-sm font-medium shadow-sm hover:bg-medical-green/5 hover:border-medical-green/20 transition-all">
                        <ShieldCheck className="w-5 h-5 text-medical-green" /> {f}
                     </div>
                   ))}
                </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Booking Bar */}
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl border-2 border-medical-green p-6 shadow-xl sticky top-28">
             <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground text-sm font-medium">Starting from</span>
                <span className="text-2xl font-black text-medical-green">₹600</span>
             </div>
             <p className="text-sm text-center text-muted-foreground mb-6">Booking through Dhanvantri gives you priority queue access.</p>
             <div className="space-y-3">
                <Link href="/doctors" className="w-full block">
                  <Button className="w-full bg-medical-green hover:bg-medical-green/90 text-white rounded-full py-6 font-bold text-lg shadow-lg shadow-medical-green/20">Find Specialists</Button>
                </Link>
                <Link href="/appointments/book" className="w-full block">
                  <Button variant="outline" className="w-full border-medical-blue text-medical-blue hover:bg-medical-blue/5 rounded-full py-6 font-bold">General Checkup</Button>
                </Link>
             </div>
             <div className="mt-6 flex flex-col gap-3 pt-6 border-t border-medical-grey">
                <div className="flex items-center justify-between text-sm">
                   <span className="text-muted-foreground flex items-center gap-2"><Phone className="w-4 h-4" /> Helpline</span>
                   <span className="font-bold">1800-419-1066</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                   <span className="text-muted-foreground flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Whatsapp</span>
                   <span className="font-bold text-medical-green">Available</span>
                </div>
             </div>
          </div>

          <div className="bg-gradient-to-br from-medical-red/10 to-medical-red/20 rounded-2xl p-6 border border-medical-red/20">
             <h4 className="text-medical-red font-black text-lg mb-2 flex items-center gap-2">EMERGENCY?</h4>
             <p className="text-xs text-medical-red/80 font-medium mb-4 uppercase tracking-wider">Fastest Response Time: 8 Minutes</p>
             <Button className="w-full bg-medical-red hover:bg-medical-red/90 text-white rounded-full font-bold">CALL AMBULANCE NOW</Button>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  )
}
