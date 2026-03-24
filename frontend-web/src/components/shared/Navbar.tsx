"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldPlus } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white top-0 sticky z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="Dhanvantri Logo" className="h-6 w-auto" />
          <span className="text-xl font-bold tracking-tight text-medical-green">Dhanvantri</span>
        </Link>
        <div className="hidden md:flex gap-6 items-center flex-1 justify-center ml-8 text-sm font-medium">
          <Link href="/" className="hover:text-medical-green transition-colors">Home</Link>
          <Link href="/doctors" className="hover:text-medical-green transition-colors">Find Doctors</Link>
          <Link href="/hospitals" className="hover:text-medical-green transition-colors">Hospitals</Link>
          <Link href="/services" className="hover:text-medical-green transition-colors">Services</Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" className="text-medical-green hover:text-medical-green/90">Login</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-medical-green hover:bg-medical-green/90 text-white rounded-full px-6">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
