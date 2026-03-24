"use client"

import AdminLayout from "@/layouts/AdminLayout"
import { Users, Save, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminAddUserPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In-memory: In a real app this would update the store. For now redirect.
    router.push("/admin/users")
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-8 pb-32">
        <div className="flex items-center gap-4">
          <Link href="/admin/users">
            <Button variant="outline" size="icon" className="rounded-full shadow-sm w-10 h-10 border-medical-grey"><ArrowLeft className="w-4 h-4" /></Button>
          </Link>
          <div className="flex flex-col gap-1 tracking-tighter">
             <h1 className="text-2xl md:text-3xl font-black flex items-center gap-3">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-medical-blue" /> Add New User
             </h1>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-medical-grey/60 shadow-xl p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Full Name</label>
              <Input 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50" 
                placeholder="e.g. Rahul Sharma" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Email Address</label>
              <Input 
                required
                type="email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50" 
                placeholder="e.g. rahul@example.com" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Password</label>
              <Input 
                required
                type="password"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50" 
                placeholder="Required for their login" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">System Role</label>
              <select 
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                className="w-full rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50 px-3 text-sm font-medium focus:ring-2 focus:ring-medical-blue/30 outline-none"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="hospital">Hospital Staff</option>
                <option value="admin">System Admin</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Link href="/admin/users">
                <Button type="button" variant="outline" className="rounded-full h-12 px-8 font-black uppercase tracking-widest text-[10px] border-medical-grey">Cancel</Button>
              </Link>
              <Button type="submit" className="rounded-full h-12 px-8 font-black uppercase tracking-widest text-[10px] bg-medical-blue hover:bg-medical-blue/90 text-white shadow-lg shadow-medical-blue/20 flex items-center gap-2">
                <Save className="w-4 h-4" /> Create User
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
