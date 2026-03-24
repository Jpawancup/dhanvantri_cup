"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Star, MapPin, GraduationCap, Video, Phone, MessageSquare, Calendar, Award, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const slots = ["9:00 AM", "9:30 AM", "10:30 AM", "11:00 AM", "02:00 PM", "03:30 PM", "04:00 PM", "05:00 PM"]

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      {/* Back bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-2 sticky top-16 z-20">
        <Link href="/doctors"><button className="p-2 rounded-full hover:bg-medical-grey"><ArrowLeft className="w-5 h-5" /></button></Link>
        <h2 className="font-semibold">Doctor Profile</h2>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-medical-green/10 to-medical-blue/10 p-6">
        <div className="flex items-start gap-5 max-w-3xl mx-auto">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300" alt="Doctor" className="w-28 h-28 rounded-2xl border-4 border-white shadow-md object-cover" />
            <div className="absolute -bottom-2 -right-2 bg-medical-green text-white text-[10px] font-bold px-2 py-1 rounded-full">VERIFIED ✓</div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold">Dr. Amit Sharma</h1>
            <p className="text-medical-blue font-semibold mt-1">Senior Cardiologist</p>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />4.8 (220)</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />Apollo Hospitals</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="bg-medical-green/10 text-medical-green px-2 py-0.5 rounded-md font-medium">14 yrs exp</span>
              <span className="bg-medical-blue/10 text-medical-blue px-2 py-0.5 rounded-md font-medium">₹800 / consult</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="bg-white border-b px-6 py-4 grid grid-cols-3 gap-3 max-w-3xl mx-auto w-full">
        <Link href="/appointments/book"><Button className="w-full bg-medical-green hover:bg-medical-green/90 text-white rounded-full text-sm"><Calendar className="w-4 h-4 mr-1" />Book Visit</Button></Link>
        <Button variant="outline" className="w-full rounded-full border-medical-blue text-medical-blue hover:bg-medical-blue/5 text-sm"><Video className="w-4 h-4 mr-1" />Video Call</Button>
        <Link href="/chats/1"><Button variant="outline" className="w-full rounded-full border-medical-grey text-sm"><MessageSquare className="w-4 h-4 mr-1" />Chat</Button></Link>
      </div>

      {/* Tabs */}
      <div className="max-w-3xl mx-auto p-4">
        <Tabs defaultValue="about">
          <TabsList className="w-full bg-medical-grey grid grid-cols-4">
            {["about", "experience", "slots", "reviews"].map(t => (
              <TabsTrigger key={t} value={t} className="capitalize data-[state=active]:bg-white data-[state=active]:text-medical-green font-medium">{t}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="about" className="mt-4 space-y-4">
            <div className="bg-white rounded-xl border p-4 space-y-2">
              <h3 className="font-semibold text-sm text-medical-green uppercase tracking-wide">About</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Dr. Amit Sharma is a Senior Cardiologist with 14 years of experience treating cardiac diseases, hypertension, and heart failures. He specializes in non-invasive diagnostics and preventative cardiology.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[["Languages", "Hindi, English, Marathi"], ["Hospital", "Apollo Hospitals, Mumbai"], ["Consults", "1,240+ patients"], ["Next Available", "Today, 3:30 PM"]].map(([k,v]) => (
                <div key={k} className="bg-white rounded-xl border p-4">
                  <p className="text-xs text-muted-foreground font-medium">{k}</p>
                  <p className="text-sm font-semibold mt-0.5">{v}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experience" className="mt-4 space-y-3">
            {[{ degree: "MD — Cardiology", inst: "AIIMS Delhi", year: "2010" }, { degree: "MBBS", inst: "Grant Medical College, Mumbai", year: "2006" }].map((e) => (
              <div key={e.degree} className="bg-white rounded-xl border p-4 flex gap-3">
                <div className="w-10 h-10 bg-medical-green/10 rounded-xl flex items-center justify-center flex-shrink-0"><GraduationCap className="w-5 h-5 text-medical-green" /></div>
                <div>
                  <p className="font-semibold text-sm">{e.degree}</p>
                  <p className="text-xs text-muted-foreground">{e.inst} • {e.year}</p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="slots" className="mt-4 space-y-4">
            <div className="bg-medical-green/5 rounded-xl p-3 text-sm text-medical-green font-medium">📅 Select a slot to book an appointment</div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((s, i) => (
                <Link href="/appointments/book" key={s}>
                  <button className={`w-full py-2 rounded-lg border text-sm font-medium transition-colors ${i % 3 === 0 ? "bg-medical-grey text-muted-foreground cursor-not-allowed" : "border-medical-green text-medical-green hover:bg-medical-green hover:text-white"}`}>
                    {i % 3 === 0 ? "Booked" : s}
                  </button>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4 space-y-3">
            {[{ name: "Rahul S.", rating: 5, text: "Very patient and thorough. Explained everything clearly. Highly recommend!", time: "2 days ago" }, { name: "Priya M.", rating: 4, text: "Great doctor. The appointment was on time and the diagnosis was accurate.", time: "1 week ago" }].map((r) => (
              <div key={r.name} className="bg-white rounded-xl border p-4 space-y-2">
                <div className="flex justify-between"><p className="font-semibold text-sm">{r.name}</p><span className="text-xs text-muted-foreground">{r.time}</span></div>
                <div className="flex">{Array.from({length:5}).map((_,i) => <Star key={i} className={`w-4 h-4 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}/>)}</div>
                <p className="text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
