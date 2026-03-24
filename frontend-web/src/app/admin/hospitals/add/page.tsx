"use client"

import AdminLayout from "@/layouts/AdminLayout"
import { Building2, Save, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getData, saveData, generateId } from "@/services/localDb"
import { useRouter } from "next/navigation"

export default function AdminAddHospitalPage() {
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: "",
    type: "Multi-Specialty",
    location: "",
    adminId: "",
    specialties: "",
    bedsAvailable: 0
  })

  useEffect(() => {
    // Only fetch users marked as hospital admin
    const allUsers = getData("users") || []
    setUsers(allUsers.filter((u: any) => u.role === "hospital"))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.adminId) return alert("Select an admin user first")

    const hospitals = getData("hospitals") || []
    hospitals.unshift({
      id: "h_" + generateId(),
      ...formData,
      images: ["https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop"],
      rating: 4.5
    })
    saveData("hospitals", hospitals)
    router.push("/admin/hospitals")
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-8 pb-32">
        <div className="flex items-center gap-4">
          <Link href="/admin/hospitals">
            <Button variant="outline" size="icon" className="rounded-full shadow-sm w-10 h-10 border-medical-grey"><ArrowLeft className="w-4 h-4" /></Button>
          </Link>
          <div className="flex flex-col gap-1 tracking-tighter">
             <h1 className="text-2xl md:text-3xl font-black flex items-center gap-3">
                <Building2 className="w-6 h-6 md:w-8 md:h-8 text-medical-blue" /> Onboard Hospital
             </h1>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-medical-grey/60 shadow-xl p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Hospital Name</label>
              <Input 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50" 
                placeholder="e.g. Apollo Jubilee Hills" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Location</label>
              <Input 
                required
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                className="rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50" 
                placeholder="e.g. Jubilee Hills, Hyderabad" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Hospital Type</label>
              <select 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50 px-3 text-sm font-medium focus:ring-2 focus:ring-medical-blue/30 outline-none"
              >
                <option value="Multi-Specialty">Multi-Specialty</option>
                <option value="Super-Specialty">Super-Specialty</option>
                <option value="General">General</option>
                <option value="Clinic">Clinic</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Hospital Admin</label>
              <select 
                required
                value={formData.adminId}
                onChange={e => setFormData({...formData, adminId: e.target.value})}
                className="w-full rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50 px-3 text-sm font-medium focus:ring-2 focus:ring-medical-blue/30 outline-none"
              >
                <option value="">-- Assign Admin User --</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
               {users.length === 0 && <p className="text-xs text-medical-red">No users with "hospital" role found. Add one in Users page.</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-sm font-bold text-foreground">Specialties</label>
                 <Input 
                   required
                   value={formData.specialties}
                   onChange={e => setFormData({...formData, specialties: e.target.value})}
                   className="rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50" 
                   placeholder="e.g. Cardiology, Neurology" 
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold text-foreground">Initial Beds</label>
                 <Input 
                   required
                   type="number"
                   value={formData.bedsAvailable}
                   onChange={e => setFormData({...formData, bedsAvailable: parseInt(e.target.value)})}
                   className="rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50" 
                 />
               </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Link href="/admin/hospitals">
                <Button type="button" variant="outline" className="rounded-full h-12 px-8 font-black uppercase tracking-widest text-[10px] border-medical-grey">Cancel</Button>
              </Link>
              <Button type="submit" className="rounded-full h-12 px-8 font-black uppercase tracking-widest text-[10px] bg-medical-blue hover:bg-medical-blue/90 text-white shadow-lg shadow-medical-blue/20 flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Partner
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
