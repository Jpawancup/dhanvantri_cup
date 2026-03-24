"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { ArrowLeft, MapPin, Search, ChevronRight, Activity, Clock, ShieldCheck, Zap, Trash2, Plus, Minus, Tag, CreditCard, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"

const initialCart = [
  { id: 1, name: "Metformin 500mg", price: 120, originalPrice: 150, brand: "Cipla", prescription: true, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2060&auto=format&fit=crop", qty: 2 },
  { id: 2, name: "Paracetamol Case", price: 45, originalPrice: 60, brand: "Crocin", prescription: false, img: "https://images.unsplash.com/photo-1550572528-f291309f4ffb?q=80&w=2070&auto=format&fit=crop", qty: 1 },
]

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState(initialCart)

  const updateQty = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta)
        return { ...item, qty: newQty }
      }
      return item
    }))
  }

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0)
  const discount = cart.reduce((acc, item) => acc + ((item.originalPrice - item.price) * item.qty), 0)
  const total = subtotal + 40 // + delivery

  return (
    <DashboardLayout>
      <div className="bg-medical-grey/20 min-h-screen pb-24">
         <div className="bg-white px-4 pt-4 pb-4 sticky top-16 z-20 shadow-sm border-b mb-6">
            <div className="flex items-center gap-4 max-w-3xl mx-auto">
               <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full shrink-0">
                 <ArrowLeft className="w-5 h-5" />
               </Button>
               <div>
                  <h1 className="font-extrabold text-xl leading-tight">Your Cart</h1>
                  <p className="text-xs font-bold text-muted-foreground">{cart.length} items • Delivery to <span className="text-medical-green cursor-pointer">Home ↗</span></p>
               </div>
            </div>
         </div>

         <div className="max-w-3xl mx-auto px-4 space-y-6">
            {cart.length === 0 ? (
               <div className="bg-white p-8 rounded-3xl border border-dashed flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-medical-grey rounded-full flex items-center justify-center mb-2">
                     <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-black">Your cart is empty</h2>
                  <p className="text-muted-foreground font-medium text-sm">Add some medicines or health products to checkout.</p>
                  <Button onClick={() => router.push('/medicine')} className="mt-4 rounded-full font-black px-8">BROWSE MEDICINES</Button>
               </div>
            ) : (
               <>
                  <div className="bg-white rounded-3xl p-4 shadow-sm border border-medical-grey/60 space-y-4">
                     {cart.map(item => (
                        <div key={item.id} className="flex gap-4 p-2 relative group">
                           <div className="w-24 h-24 rounded-2xl overflow-hidden bg-medical-grey shrink-0 border border-medical-grey relative">
                              <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                              {item.prescription && (
                                <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-md text-white text-[8px] font-black px-1.5 py-0.5 rounded flex items-center gap-1">
                                   <ShieldCheck className="w-2 h-2" /> RX
                                </div>
                              )}
                           </div>
                           <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                              <div>
                                 <h3 className="font-black text-sm leading-tight pr-8 truncate">{item.name}</h3>
                                 <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-0.5">{item.brand}</p>
                              </div>
                              <div className="flex items-end justify-between mt-2">
                                 <div>
                                    <span className="text-lg font-black leading-none">₹{item.price}</span>
                                    <span className="text-[10px] text-muted-foreground line-through ml-1.5 font-bold">₹{item.originalPrice}</span>
                                 </div>
                                 <div className="flex items-center gap-3 bg-medical-grey rounded-full px-1.5 py-1">
                                    <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-black">
                                       <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="text-sm font-black w-3 text-center">{item.qty}</span>
                                    <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-medical-green">
                                       <Plus className="w-3 h-3" />
                                    </button>
                                 </div>
                              </div>
                           </div>
                           <button onClick={() => removeItem(item.id)} className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 p-1">
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     ))}
                  </div>

                  {cart.some(item => item.prescription) && (
                     <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5 flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                           <ShieldCheck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="space-y-2 flex-1">
                           <h4 className="font-black text-sm text-blue-900 leading-tight">Prescription Required</h4>
                           <p className="text-xs font-semibold text-blue-700/80 leading-relaxed">Some items in your cart require a valid prescription. Please upload it to proceed.</p>
                           <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full h-10 font-bold text-xs shadow-sm mt-2">
                              UPLOAD PRESCRIPTION
                           </Button>
                        </div>
                     </div>
                  )}

                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-medical-grey/60 space-y-4">
                     <h3 className="font-black text-lg mb-4">Bill Summary</h3>
                     <div className="space-y-3 text-sm font-medium">
                        <div className="flex justify-between text-muted-foreground">
                           <span>Item Total (MRP)</span>
                           <span>₹{subtotal + discount}</span>
                        </div>
                        <div className="flex justify-between text-medical-green font-bold">
                           <span>Discount on MRP</span>
                           <span>-₹{discount}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                           <span>Delivery Fee</span>
                           <span>₹40</span>
                        </div>
                        <div className="h-px bg-medical-grey w-full my-4" />
                        <div className="flex justify-between font-black text-lg">
                           <span>To Pay</span>
                           <span>₹{total}</span>
                        </div>
                     </div>
                     <div className="bg-green-50 text-green-700 border border-green-200 rounded-xl p-3 text-xs font-bold flex items-center gap-2">
                        <Tag className="w-4 h-4" /> You're saving ₹{discount} on this order!
                     </div>
                  </div>

                  <Button className="w-full bg-medical-green hover:bg-medical-green/90 text-white rounded-full h-16 font-black tracking-widest shadow-xl flex items-center justify-between px-1.5 focus:scale-95 transition-transform mt-8">
                     <span className="w-14" />
                     PROCEED TO PAY ₹{total}
                     <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <ChevronRight className="w-6 h-6 text-white" />
                     </div>
                  </Button>
               </>
            )}
         </div>
      </div>
    </DashboardLayout>
  )
}
