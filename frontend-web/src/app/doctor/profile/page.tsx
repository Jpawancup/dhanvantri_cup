"use client"

import DoctorLayout from "@/layouts/DoctorLayout"
import { User, Settings, ShieldCheck, Mail, Phone, Calendar, Star, GraduationCap, MapPin, Edit3, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function DoctorProfilePage() {
  return (
    <DoctorLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 pb-32 tracking-tight">
        {/* Cover Photo Area */}
        <div className="h-48 md:h-64 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-medical-green relative overflow-hidden flex items-center justify-center">
           <div className="absolute top-4 right-4 flex gap-2">
              <button className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all border border-white/20"><Camera className="w-5 h-5" /></button>
           </div>
           <div className="absolute inset-0 bg-medical-green/10 opacity-50 blur-3xl animate-pulse" />
        </div>

        {/* Profile Content */}
        <div className="px-6 md:px-12 mt-[-100px] relative z-20 flex flex-col items-center md:items-start md:flex-row gap-8">
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="relative flex-shrink-0"
           >
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" 
                alt="Doctor Profile" 
                className="w-40 h-40 md:w-52 md:h-52 rounded-[3rem] object-cover border-8 border-white shadow-2xl"
              />
              <div className="absolute bottom-2 right-2 w-10 h-10 bg-medical-green rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-xl">
                 <ShieldCheck className="w-5 h-5" />
              </div>
           </motion.div>

           <div className="flex-1 text-center md:text-left pt-2 md:pt-24 min-w-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div>
                    <h1 className="text-4xl font-black italic tracking-tighter">Dr. Amit Sharma</h1>
                    <p className="text-lg font-bold text-medical-green uppercase tracking-widest mt-1">Senior Cardiologist</p>
                 </div>
                 <div className="flex gap-2 self-center md:self-auto">
                    <Button variant="outline" className="rounded-2xl border-medical-grey px-6 h-12 font-black uppercase text-xs tracking-widest"><Settings className="w-4 h-4 mr-2" /> Settings</Button>
                    <Button className="rounded-2xl bg-medical-green hover:bg-medical-green/90 text-white px-8 h-12 font-black uppercase text-xs tracking-widest shadow-xl shadow-medical-green/20"><Edit3 className="w-4 h-4 mr-2" /> Edit Profile</Button>
                 </div>
              </div>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="md:col-span-2 space-y-8">
              <div className="bg-white rounded-[2rem] p-8 border border-medical-grey/60 shadow-sm space-y-4">
                 <h3 className="font-extrabold text-lg uppercase tracking-widest flex items-center gap-2">
                    <User className="w-5 h-5 text-medical-blue" /> Biography
                 </h3>
                 <p className="text-sm font-medium text-muted-foreground leading-relaxed max-w-2xl opacity-70">Over 15 years of experience in specialized heart surgeries and preventative cardiology. Member of the Indian Cardiologist Association with multiple research publications in advanced surgical procedures. Expert in non-invasive treatments and health optimization lifestyle coaching.</p>
              </div>

              <div className="bg-white rounded-[2rem] p-8 border border-medical-grey/60 shadow-sm space-y-6">
                 <h3 className="font-extrabold text-lg uppercase tracking-widest flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-medical-pink" /> Education & Qualifications
                 </h3>
                 <div className="space-y-4">
                    {[
                      { degree: "MBBS", institution: "AIIMS New Delhi", year: "2010" },
                      { degree: "MD - Cardiology", institution: "PGIMER Chandigarh", year: "2015" },
                      { degree: "FRCP", institution: "Royal College of Physicians, London", year: "2018" }
                    ].map((edu, i) => (
                      <div key={i} className="flex gap-4 group">
                         <div className="w-12 h-12 rounded-2xl bg-medical-grey/30 flex items-center justify-center flex-shrink-0 group-hover:bg-medical-pink/10 group-hover:text-medical-pink transition-colors"><GraduationCap className="w-5 h-5" /></div>
                         <div>
                            <p className="font-black text-sm uppercase tracking-tight">{edu.degree}</p>
                            <p className="text-xs font-bold text-muted-foreground opacity-60 uppercase">{edu.institution} • {edu.year}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <aside className="space-y-8">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-[2rem] p-8 border border-indigo-200">
                 <h3 className="font-extrabold text-sm uppercase tracking-widest text-indigo-900 mb-6 italic">Quick Stats</h3>
                 <div className="space-y-6">
                    <div className="flex justify-between items-center bg-white/40 p-4 rounded-2xl border border-white/50">
                       <span className="text-xs font-black uppercase text-indigo-900 opacity-60">Success Rate</span>
                       <span className="text-xl font-black text-indigo-900">98%</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/40 p-4 rounded-2xl border border-white/50">
                       <span className="text-xs font-black uppercase text-indigo-900 opacity-60">Avg. Rating</span>
                       <span className="text-xl font-black text-indigo-900 flex items-center gap-1.5"><Star className="w-5 h-5 fill-indigo-700 text-indigo-700" /> 4.9</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/40 p-4 rounded-2xl border border-white/50">
                       <span className="text-xs font-black uppercase text-indigo-900 opacity-60">Consultations</span>
                       <span className="text-xl font-black text-indigo-900 tracking-tighter">8,540+</span>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-[2rem] p-8 border border-medical-grey/60 shadow-sm space-y-6">
                 <h3 className="font-extrabold text-sm uppercase tracking-widest text-foreground italic flex items-center gap-2">
                    <Phone className="w-4 h-4 text-medical-green" /> Contact Info
                 </h3>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">
                       <Mail className="w-4 h-4 text-medical-blue" /> amit.sharma@hospital.com
                    </div>
                    <div className="flex items-center gap-4 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">
                       <Phone className="w-4 h-4 text-medical-green" /> +91 99887 76655
                    </div>
                    <div className="flex items-center gap-4 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">
                       <MapPin className="w-4 h-4 text-medical-red" /> Max Hospital, Delhi
                    </div>
                 </div>
              </div>
           </aside>
        </div>
      </div>
    </DoctorLayout>
  )
}
