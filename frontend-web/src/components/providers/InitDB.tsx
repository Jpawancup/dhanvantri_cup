"use client"

import { useEffect } from "react"
import { initializeDatabase } from "@/services/localDb"
import { seedAppData } from "@/services/seedData"

export default function InitDB() {
  useEffect(() => {
    initializeDatabase()
    seedAppData()
  }, [])
  return null
}
