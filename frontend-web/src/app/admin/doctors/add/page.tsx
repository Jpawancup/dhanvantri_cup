"use client"

import AdminLayout from "@/layouts/AdminLayout"
import { HeartPulse, Save, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getData, saveData, generateId } from "@/services/localDb"
import { useRouter } from "next/navigation"

export default function AdminAddDoctorPage() {
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const [hospitals, setHospitals] = useState<any[]>([])
  
  const [formData, setFormData] = useState({
    userId: "",
    hospitalId: "",
    specialization: "",
    experience: 0,
    fee: 0,
    verified: false
  })

  useEffect(() => {
    // Only fetch users who are marked as role="doctor" but not yet in the doctors table
    const allUsers = getData("users") || []
    const allDoctors = getData("doctors") || []
    const doctorUserIds = allDoctors.map((d: any) => d.userId)
    
    setUsers(allUsers.filter((u: any) => u.role === "doctor" && !doctorUserIds.includes(u.id)))
    setHospitals(getData("hospitals") || [])
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.userId) return alert("Select a user first")

    const docs = getData("doctors") || []
    docs.unshift({
      id: "d_" + generateId(),
      ...formData
    })
    saveData("doctors", docs)
    router.push("/admin/doctors")
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-8 pb-32">
        <div className="flex items-center gap-4">
          <Link href="/admin/doctors">
            <Button variant="outline" size="icon" className="rounded-full shadow-sm w-10 h-10 border-medical-grey"><ArrowLeft className="w-4 h-4" /></Button>
          </Link>
          <div className="flex flex-col gap-1 tracking-tighter">
             <h1 className="text-2xl md:text-3xl font-black flex items-center gap-3">
                <HeartPulse className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" /> Create Doctor Profile
             </h1>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-medical-grey/60 shadow-xl p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Select User Account</label>
              <select 
                required
                value={formData.userId}
                onChange={e => setFormData({...formData, userId: e.target.value})}
                className="w-full rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50 px-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/30 outline-none"
              >
                <option value="">-- Choose User --</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
              {users.length === 0 && <p className="text-xs text-medical-red">No available users with role="doctor". Create one in Users first.</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Assign to Hospital (Optional)</label>
              <select 
                value={formData.hospitalId}
                onChange={e => setFormData({...formData, hospitalId: e.target.value})}
                className="w-full rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50 px-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/30 outline-none"
              >
                <option value="">-- Independent --</option>
                {hospitals.map(h => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-sm font-bold text-foreground">Specialization</label>
                 <Input 
                   required
                   value={formData.specialization}
                   onChange={e => setFormData({...formData, specialization: e.target.value})}
                   className="rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50" 
                   placeholder="e.g. Cardiologist" 
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold text-foreground">Experience (Years)</label>
                 <Input 
                   required
                   type="number"
                   value={formData.experience}
                   onChange={e => setFormData({...formData, experience: parseInt(e.target.value)})}
                   className="rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50" 
                   placeholder="e.g. 10" 
                 />
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Consultation Fee (₹)</label>
              <Input 
                required
                type="number"
                value={formData.fee}
                onChange={e => setFormData({...formData, fee: parseInt(e.target.value)})}
                className="rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50" 
                placeholder="e.g. 1000" 
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Link href="/admin/doctors">
                <Button type="button" variant="outline" className="rounded-full h-12 px-8 font-black uppercase tracking-widest text-[10px] border-medical-grey">Cancel</Button>
              </Link>
              <Button type="submit" className="rounded-full h-12 px-8 font-black uppercase tracking-widest text-[10px] bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Doctor Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
