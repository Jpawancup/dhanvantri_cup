"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import FeedPost from "@/components/social/FeedPost"
import StoriesSection from "@/components/sections/StoriesSection"
import { feedPosts } from "@/services/mockData"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Rss, Stethoscope, Laugh, Newspaper, Flame, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { getData } from "@/services/localDb"

const categories = [
  { label: "All", icon: Rss },
  { label: "Health", icon: Heart },
  { label: "Doctors", icon: Stethoscope },
  { label: "Trending", icon: Flame },
  { label: "News", icon: Newspaper },
  { label: "Comedy", icon: Laugh },
]

export default function FeedPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    const rawPosts = getData("posts") || []
    const users = getData("users") || []
    const enriched = rawPosts.map((post: any) => {
      const u = users.find((x: any) => x.id === post.userId) || {}
      return {
        ...post,
        author: u.name,
        role: u.role,
        avatar: u.profileImage,
        time: "Just now" // Can be calculated based on createdAt
      }
    })
    setPosts(enriched)
  }, [])

  return (
    <DashboardLayout>
      <StoriesSection />

      {/* Category chips */}
      <div className="bg-white border-b px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide sticky top-16 z-20 shadow-sm">
        {categories.map((c) => (
          <button
            key={c.label}
            onClick={() => setActiveCategory(c.label)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold flex-shrink-0 transition-all ${activeCategory === c.label ? "bg-medical-green text-white shadow-md shadow-medical-green/20" : "bg-medical-grey text-foreground/70 hover:bg-medical-green/10 hover:text-medical-green"}`}
          >
            <c.icon className="w-3.5 h-3.5" /> {c.label}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto md:p-6 space-y-4 md:space-y-6 pb-24">
        <Tabs defaultValue="foryou">
          <div className="sticky top-[108px] z-10 bg-white/80 md:bg-medical-grey/5 py-3 md:py-4 px-4 md:px-2 md:-mx-2 backdrop-blur-md md:rounded-2xl mb-2 md:mb-4 border-b md:border-b-0">
            <TabsList className="grid w-full grid-cols-2 bg-medical-grey/30 md:bg-white border-0 md:border shadow-sm rounded-xl p-1">
              <TabsTrigger value="foryou" className="data-[state=active]:bg-white md:data-[state=active]:bg-medical-green data-[state=active]:text-foreground md:data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg font-bold text-xs uppercase tracking-widest transition-all">For You</TabsTrigger>
              <TabsTrigger value="following" className="data-[state=active]:bg-white md:data-[state=active]:bg-medical-green data-[state=active]:text-foreground md:data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg font-bold text-xs uppercase tracking-widest transition-all">Following</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="foryou" className="mt-0 md:mt-4 space-y-0 md:space-y-4 flex flex-col gap-2 md:gap-0">
            {posts.map(p => (
               <FeedPost key={p.id} post={p} />
            ))}
          </TabsContent>
          <TabsContent value="following" className="mt-0 md:mt-4 px-4 md:px-0">
            <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-dashed border-medical-grey/80 m-4 md:m-0">
              <Rss className="w-12 h-12 text-muted-foreground/40 mx-auto" />
              <p className="font-black text-lg">Nothing here yet</p>
              <p className="text-sm text-muted-foreground font-medium max-w-xs mx-auto leading-relaxed">Follow doctors and friends to see their health tips and updates here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
